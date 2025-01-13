// import { Application, Request, Response, NextFunction } from 'express';

// import * as passportGoogle from 'passport-google-oauth2';
// import * as passport from 'passport';
// import * as bcrypt from 'bcrypt';

// import { secretsConfig } from '../../config/secrets';

// import { stringValidator } from '../stringValidator.service';
// import { accountsDb } from '../connectors/db/accounts-db';

// import { Account } from '../../models';


// class InitializePassportGoogleStrategy {


//     public initPassport(app: Application) {

//         passport.use(new passportGoogle.Strategy({
//             clientID: secretsConfig.google_oauth_login_client_id,
//             clientSecret: secretsConfig.google_oauth_login_client_secret,
//             callbackURL: '/auth/google/redirect',
//         },
//             (accessToken, refreshToken, profile, done) => {
//                 // get profile details
//                 // save profile details in db
//             }));

//     }

// }
