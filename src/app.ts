import * as express from 'express';
import * as session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as https from 'https';
import * as http from 'http';
import * as expressMySqlSession from 'express-mysql-session';
import * as passport from 'passport';
require('dotenv').config();

import { config } from './config';

import { Account } from './models';

import { utilsService } from './lib/utilities.service';
import { accountsDb } from './lib/connectors/db/accounts-db';
import { initializePassportLocalStrategy } from './lib/authenticators/passport-local.mw';

import { auditLoggerInterceptResponse } from './lib/middlewares/logger-interception-response.middleware';
import { setupSwagger } from './openapi/swagger';
import { startupDevelopmentModeFunctions } from './lib/startup-functions/dev.service';

import { IndexRoutes } from './routes/index';
import { AuthLoginRoutes } from './routes/auth/login';
import { AuthLogoutRoutes } from './routes/auth/logout';
import { Error404Routes } from './routes/errors/error-404';




declare module 'express-session' {
    export interface SessionData {
        user: Account;
        created_at: string | Date;
    }
}


class App {

    private app: express.Application;

    constructor() {

        this.app = express(); // create express application instance
        this.app.set('PORT', process.env.BACKEND_PORT || 8080); // define the port globally

        this.config();
        this.routes();

    }



    private domains_list = [
        'http://localhost:4200',
        'https://localhost:4200'
    ];



    // Server configuration
    private config(): void {


        this.app.use(express.json({ limit: '32mb' })); // support application/json type post data
        this.app.use(express.urlencoded({ extended: false, limit: '32mb' })); // support application/x-www-form-urlencoded post data


        // connect the front-end part for production. If you DON'T need it, please deactivate it
        if (config?.production)
            this.app.use(express.static(utils.path.join(__dirname, 'public')));


        this.app.use(session({ // https://www.npmjs.com/package/express-session
            secret: process.env.SESSION_PUBLIC_KEY,
            name: 'schillz_management_app.sid',
            cookie: {
                httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not client JavaScript, helping to protect against cross-site scripting attacks.
                secure: true, // Ensures the browser only sends the cookie over HTTPS.
                maxAge: 3 * 24 * 60 * 60 * 1000,
                sameSite: 'none',
            },
            saveUninitialized: false,
            resave: true,
            store: new mySQLSessionStore({
                    checkExpirationInterval: 900000, // clear expired sessions every 15 minutes
                    schema: {
                        tableName: 'sessions',
                        columnNames: {
                            session_id: 'sid',
                            expires: 'expires',
                            data: 'data'
                        }
                    }
                }, utilsService.database.accounts._mysql.createPool(utilsService.database.accounts.poolConfig)), // session store
            genid: (req: express.Request) => uuidv4()
        }));



        this.app.use(cors({
            // origin: '*',
            origin: (origin, callback) => {

                if (!origin)
                    return callback(null, true);

                if (!this.domains_list.includes(origin))
                    return callback(null, false);                // to block --> (null, false)

                return callback(null, true);
            },
            credentials: true,
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'PORT', 'DELETE'],
        }));

        this.app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, X-Content-Type-Options');

            next();

        });


        this.app.set('trust proxy', true);


        // routes tracker
        this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
            stream: utilsService.fs.createWriteStream(
                utilsService.path.join(__dirname, './logs/access.log'),
                { flags: 'a' }
            )
        }));



        // audit the requests & responses --- START
        this.app.use(auditLoggerInterceptResponse);
        // audit the requests & responses --- END





        // configure passport
        this.app.use(passport.initialize());
        this.app.use(passport.authenticate('session'));
        initializePassportLocalStrategy.initPassport(this.app);


        // start-setup the swagger here
        setupSwagger(this.app);



        // Start express server
        if (process.env.ENVIRONMENT_MODE === 'development') {

            const https_server = https.createServer({
                key: utilsService.fs.readFileSync(utilsService.path.join(__dirname, '/config/certs/server.key')),
                cert: utilsService.fs.readFileSync(utilsService.path.join(__dirname, '/config/certs/server.cert'))
            }, this.app);

            https_server.listen(this.app.get('PORT'), async () => {
                await startupDevelopmentModeFunctions.deleteResponseHistory();                      // delete response_log from database
                await startupDevelopmentModeFunctions.deleteSystemErrorsHistory();                  // delete system errors from database
                await startupDevelopmentModeFunctions.deleteLoginGeolocationDetailsHistory();       // delete login geolocation details from database

                console.log(utilsService.chalk.bold(`Express API Template - Copyright 20[2-9][0-9] - Anastasios Tsalmas`));
                console.log(`https://tsalmas.com`);
                console.log(`Server is running on port: ${this.app.get('PORT')} (https://localhost:${this.app.get('PORT')})`);
                console.log('');
                console.log('');
            });

        } else {

            const http_server = http.createServer(this.app);

            http_server.listen(this.app.get('PORT'), () => {
                console.log(utilsService.chalk.bold(`Express API Template - Copyright 20[2-9][0-9] - Anastasios Tsalmas`));
                console.log(`https://tsalmas.com`);
            });

        }


    }



    // Server routing
    private routes(): void {

        // index routes
        new IndexRoutes().createRoutes(this.app);

        // error routes
        new Error404Routes().createRoutes(this.app);        // error 404

        // auth routes
        new AuthLoginRoutes().createRoutes(this.app);       // login
        new AuthLogoutRoutes().createRoutes(this.app);      // logout

    }

}


const app = new App();
