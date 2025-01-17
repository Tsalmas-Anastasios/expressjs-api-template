import { Request, Response, NextFunction, query } from 'express';
import { customAlphabet } from 'nanoid';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment-timezone';
import * as lodash from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as chalk from 'chalk';
import * as passport from 'passport';
import { accountsDb } from './connectors/db/accounts-db';
import { check_user_logged_in } from './middlewares/check-user-logged-in.middleware';
import { config } from '../config';
import slugify from 'slugify';
require('dotenv').config();




class UtilsService {

    public moment;
    public lodash;
    public path;
    public fs;
    public jwt;
    public slugify;
    public chalk;
    public passport;


    /** Middleware function for checking if user's session exist */
    public checkAuth;




    constructor() {
        this.moment = moment;
        this.lodash = lodash;
        this.path = path;
        this.fs = fs;
        this.jwt = jwt;
        this.slugify = slugify;
        this.chalk = chalk;
        this.passport = passport;

        /** Middleware function for checking if user's session exist */
        this.checkAuth = check_user_logged_in;
    }




    public delay(milliseconds: number) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }


    /** Generates hashed version of a string (e.g. hash of user's password)  */
    generateHash(value: string): string {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(value, salt);
        return hash;
    }



    // id generator
    generateId(params: { alphabet: string, length: number }): string {
        const nanoid = customAlphabet(params.alphabet, params.length);
        return nanoid();
    }



    // json web token generator
    generateJsonWebTokenJWT(params: { data: any, secret: string, expiresIn?: string }): string {

        if (params?.expiresIn)
            return this.jwt.sign(params.data, params.secret, { expiresIn: params.expiresIn });
        else
            return this.jwt.sign(params.data, params.secret);

    }



    // decode json web token
    decodeJsonWebTokenJWT(params: { jwt: string, completed: boolean }): any {

        return this.jwt.decode(params.jwt, { completed: params.completed });

    }



    /** check if a jwt expires */
    checkIfJsonWebTokenJWTExpires(data: { expDate: number }): boolean {

        try {

            if (this.moment(new Date()).unix() > data.expDate - 3600)
                return true;

            return false;

        } catch (error) {
            return error;
        }

    }




    collectPropertiesObj(obj: any, sub_obj_divider?: string, parent_key: string = '', ppath: any[] = []): string[] {

        for (const key in obj)
            if (obj.hasOwnProperty(key)) {
                const fullKey = parent_key ? `${parent_key}${sub_obj_divider || '__'}${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null)
                    this.collectPropertiesObj(obj[key], sub_obj_divider || '__', fullKey, ppath);
                else
                    ppath.push(fullKey);
            }


        return ppath;

    }



    /** create mysql string for columns */
    createMySQLColumnsQuery(params: {
        type: 'INSERT' | 'UPDATE',
        query_fields: string[],
        properties_obj: any,
        sub_obj_divider?: string,
    }): string {

        let sql_query_string = '';
        // const ppath: string[] = this.collectPropertiesObj(params.properties_obj, params.sub_obj_divider || '__');


        if (params.type === 'INSERT')

            for (const field of params.query_fields) {

                if (!params?.sub_obj_divider) {
                    if (typeof params.properties_obj[field] === undefined
                        || typeof params.properties_obj[field] === null)
                        continue;
                } else {

                    const value = this.getValueFromNestedObject(params.properties_obj, field, params.sub_obj_divider);

                    if (typeof value === undefined || typeof value === null)
                        continue;

                }




                sql_query_string += `, ${field} = :${field}`;

            }

        else if (params.type === 'UPDATE')

            for (const field of params.query_fields) {

                if (!params?.sub_obj_divider) {
                    if (typeof params.properties_obj[field] === undefined
                        || typeof params.properties_obj[field] === null) {
                        sql_query_string += `, ${field} = NULL`;
                        continue;
                    }
                } else {

                    const value = this.getValueFromNestedObject(params.properties_obj, field, params.sub_obj_divider);

                    if (typeof value === undefined || typeof value === null) {
                        sql_query_string += `, ${field} = NULL`;
                        continue;
                    }

                }


                sql_query_string += `, ${field} = :${field}`;

            }


        sql_query_string = sql_query_string.replace(/^.{2}/g, '');
        return sql_query_string;

    }




    buildingObjectFromProperties(properties_array: string[], sub_obj_divider?: string): any {

        const result = {};


        properties_array.forEach((prop_path: string) => {

            const keys = prop_path.split(sub_obj_divider);
            let current = result;


            keys.forEach((key, index) => {
                if (!current[key])
                    current[key] = (index === keys.length - 1) ? null : {};

                current = current[key];
            });

        });


        return result;

    }



    getValueFromNestedObject(initial_object: any, property_path: string, sub_obj_divider: string): any {

        const keys = property_path.split(sub_obj_divider);
        let current = initial_object;

        for (let key of keys) {
            key = key.replace(/:/g, '');

            if (current.hasOwnProperty(key))
                current = current[key];
            else
                return undefined;
        }


        return current;

    }




    // error handler
    async systemErrorHandler(error_obj: any): Promise<void> {

        try {

            const result = await accountsDb.query(`
                INSERT INTO
                    system_errors
                SET
                    error_code = :error_code,
                    error_metadata = :error_metadata;
            `, {
                error_code: error_obj?.code ? Number(error_obj.code) : 500,
                error_metadata: JSON.stringify(error_obj),
            });

        } catch (error) {

            if (!config.production) console.log(`${this.chalk.red('Error obj:')} ${error}`);

            // return res.status(500).send({
            //     code: 500,
            //     type: 'cannot_connect_to_the_db',
            //     message: 'Cannot connect to the DB'
            // });

        }


        if (!config.production) console.log(`${this.chalk.red('Error obj:')} ${error_obj}`);

        // return res.status(error_obj?.code ? Number(error_obj.code) : 500).send(error_obj);

    }




    // parse html template for emails
    parseHtmlEmailTemplate(data: { template_name: string, data: any }): string {

        let html_template = this.fs.readFileSync(this.path.join(__dirname, `../ui/email-templates/${data.template_name}.html`), 'utf8').toString();

        for (const prop in data.data)
            html_template = html_template.replace(new RegExp(`{{${prop}}}`, 'g'), data.data[prop]);


        return html_template;

    }




    /** create graphql sql query */
    createGraphqlSQLQuery(args: any, context?: any): { limit: number, offset: number, query_string: string } {

        const queryParams: { limit: number, offset: number, query_string: string } = { limit: 100, offset: 0, query_string: '' };

        if (args?.page || context?.query?.page) { // page = 3

            const page: number = args.page ? args.page : context?.query?.page ? parseInt(context.query.page) : 1;

            if (page <= 1)
                queryParams.offset = 0;
            else
                queryParams.offset = (page - 1) * queryParams.limit;

            delete args.page;

        }



        if (args && !this.lodash.isEmpty(args)) {

            for (const key in args)
                if (args[key] !== null && args[key] !== 'null')
                    if (typeof args[key] === 'number')
                        queryParams.query_string += `AND ${key} = ${args[key]}`;
                    else
                        queryParams.query_string += `AND ${key} = '${args[key]}'`;

            queryParams.query_string = queryParams.query_string.replace(/^.{4}/g, '');

        }




        return queryParams;

    }



    /** generate params string for graphql */
    generateParamsStringForGraphql(params: any): string {

        let graphQueryParams = '';

        if (params && !utilsService.lodash.isEmpty(params)) {

            graphQueryParams += '(';

            // tslint:disable-next-line:curly
            let i = 0;
            for (const key in params) {
                if (i > 0)
                    graphQueryParams += ',';

                if (typeof params[key] === 'number')
                    graphQueryParams += `${key}: ${params[key]}`;
                else if (typeof params[key] === 'boolean')
                    graphQueryParams += `${key}: ${params[key] ? 1 : 0}`;
                else
                    graphQueryParams += `${key}: "${params[key]}"`;

                i++;

            }

            graphQueryParams += ')';

        }



        return graphQueryParams;

    }




    checkObjectRequiredFields(params: { required_fields: string[], object_for_check: any }): boolean {

        for (const field of params.required_fields)
            if (typeof params.object_for_check[field] === undefined
                || typeof params.object_for_check[field] === null)
                return false;


        return true;

    }




    findAccountIdBasedOnSession(params: { req: Request, account_id?: string }): string {

        if (!params?.account_id)
            return params.req.session.user.account_id;

        return params.account_id;

    }

}



export const utilsService = new UtilsService();
