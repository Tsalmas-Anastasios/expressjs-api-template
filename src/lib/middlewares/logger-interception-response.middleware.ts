// https://dev.to/williamsgqdev/step-by-step-guide-to-implementing-nodejs-audit-trail-jic



import { NextFunction, Request, Response } from 'express';
import { accountsDb } from '../connectors/db/accounts-db';
import { utilsService } from '../utilities.service';
import { addExtraDataToResponse } from './add-extra-data-response';
import { config } from '../../config';



interface Payload {
    url: string;
    method: string;
    body: string;
    params: string;
    query: string;
    headers: string;
    statusCode: string | number;
    response?: string;
    user_details: string;
}


export const auditLoggerInterceptResponse = (req: Request, res: Response, next: NextFunction) => {


    const payload: Payload = {
        url: req.originalUrl,
        method: req.method,
        body: JSON.stringify(req.body),
        params: JSON.stringify(req.params),
        query: JSON.stringify(req.query),
        headers: JSON.stringify(req.headers),
        statusCode: res.statusCode,
        user_details: req?.session?.user ? JSON.stringify(req.session.user) : 'unauthorized',
    };


    res.on('finish', () => {
        payload.statusCode = res.statusCode;

        savePayloadDatabase(payload)
            .then()
            .catch();
    });



    if (res?.send) {

        const originalResponse = res.send;
        res.send = (body: any) => {

            // create the payload capturing relevant information about the request and response
            if (body?.password)
                delete body.password;

            payload.response = JSON.stringify(body);

            res.send = originalResponse;
            return res.send(addExtraDataToResponse(body, Number(body?.code || 200)));
        };

    } else if (res?.json) {

        const originalResponse = res.json;
        res.json = (body: any) => {

            // create the payload capturing relevant information about the request and response
            if (body?.password)
                delete body.password;

            payload.response = JSON.stringify(body);

            res.json = originalResponse;
            return res.json(addExtraDataToResponse(body, Number(body?.code || 200)));
        };

    }


    next();

};





const savePayloadDatabase = async (payload: Payload) => {

    try {


        const promises: [
            Promise<void>,
            Promise<void>
        ] = [

                new Promise(async (resolve, reject) => {

                    const insertion_result = await accountsDb.query(`
                        INSERT INTO
                            response_log
                        SET
                            url = :url,
                            method = :method,
                            body = :body,
                            params = :params,
                            query = :query,
                            headers = :headers,
                            statusCode = :statusCode,
                            response = :response,
                            user_details = :user_details


                        ON DUPLICATE KEY UPDATE
                            url = :url,
                            method = :method,
                            body = :body,
                            params = :params,
                            query = :query,
                            headers = :headers,
                            statusCode = :statusCode,
                            response = :response,
                            user_details = :user_details
                    `, payload);


                    if (insertion_result.rows.insertId) {
                        if (Number(payload.statusCode) > 499)
                            promises.push(utilsService.systemErrorHandler(payload.response));

                        savePayloadLogFile(payload);

                        consoleLoggerRequest(payload);
                    }


                }),
                null

            ];




        await Promise.all(promises);

        // return Promise.resolve(payload);

    } catch (error) {
        return Promise.resolve(error);
    }

};


const savePayloadLogFile = (payload: Payload) => {

    const response_data = `[URL] ${payload.url}    |    [METHOD] ${payload.method}    |    [BODY] ${payload.body}    |    [PARAMS] ${payload.params}    |    [QUERY] ${payload.query}    |    [HEADERS] ${payload.headers}    |    [STATUS CODE] ${payload.statusCode}    |    [USER SESSION] ${payload.user_details}    |    [TIMESTAMP] ${utilsService.moment(new Date()).format('YYYY-MM-DD, HH:mm:ss')}\n`;
    utilsService.fs.writeFileSync(utilsService.path.join(__dirname, '../../logs/response.log'), response_data, { flag: 'a+' });


    if (Number(payload.statusCode) > 399)
        utilsService.fs.writeFileSync(utilsService.path.join(__dirname, '../../logs/errors.log'), response_data, { flag: 'a+' });

};





const consoleLoggerRequest = (payload: Payload) => {

    let method_color;
    if (payload.method.toUpperCase() === 'GET')
        method_color = utilsService.chalk.blue;
    else if (payload.method.toUpperCase() === 'POST')
        method_color = utilsService.chalk.yellow;
    else if (payload.method.toUpperCase() === 'PUT')
        method_color = utilsService.chalk.cyanBright;
    else if (payload.method.toUpperCase() === 'PATCH')
        method_color = utilsService.chalk.cyan;
    else if (payload.method.toUpperCase() === 'DELETE')
        method_color = utilsService.chalk.magenta;
    else if (payload.method.toUpperCase() === 'HEAD')
        method_color = utilsService.chalk.blueBright;
    else if (payload.method.toUpperCase() === 'OPTIONS')
        method_color = utilsService.chalk.yellowBright;



    let status_color;
    if (Math.floor((Number(payload.statusCode) || 500) / 100) === 2)
        status_color = utilsService.chalk.green;
    else if (Math.floor((Number(payload.statusCode) || 500) / 100) === 3)
        status_color = utilsService.chalk.blue;
    else if (Math.floor((Number(payload.statusCode) || 500) / 100) === 4)
        status_color = utilsService.chalk.magenta;
    else if (Math.floor((Number(payload.statusCode) || 500) / 100) === 5)
        status_color = utilsService.chalk.red;


    console.log(`${method_color(payload.method.toUpperCase())} ${payload.url} ${status_color.bold(payload.statusCode)} ${utilsService.moment(new Date()).format('YYYY-MM-DD, HH:mm:ss')}`);

};
