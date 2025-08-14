import { Application, Request, Response } from 'express';
import { utilsService } from '../../lib/utilities.service';
import { accountsDb } from '../../lib/connectors/db/accounts-db';
import { Account, LoginGeolocationDetails } from '../../models';
import { sessionDataGetService } from '../../lib/session.service';
import { CreateRoutes } from '../../interfaces';


export class AuthLoginRoutes implements CreateRoutes {


    public createRoutes(app: Application) {


        // local login
        app.route('/api/auth/login/local')
            .post(async (req: Request, res: Response) => {

                // -------------------------- REQUEST DATA --------------------------
                //  BODY: { username: string, password: string, geolocation: GeolocationDetails }



                utilsService.passport.authenticate('local', async (error: any, user: Account, options) => {

                    if (!options?.message) {

                        if (user?.account_id) {
                            req.session.user = user;
                            req.session.created_at = utilsService.moment().toDate();

                            return res.status(200).send({ user: req.session.user });

                        }



                        return res.status(404).send({
                            code: 404,
                            type: 'user_not_found',
                            message: 'User doesn\'t exist yet',
                        });

                    }



                    const message_code: number = Number(options.message);


                    if (message_code === 403)
                        return res.status(403).send({
                            code: 403,
                            type: 'missing_credentials',
                            message: 'Username or password is missing',
                        });
                    else if (message_code === 404)
                        return res.status(404).send({
                            code: 404,
                            type: 'user_not_found',
                            message: 'User doesn\'t exist yet',
                        });
                    else if (message_code === 401)
                        return res.status(401).send({
                            code: 401,
                            type: 'user_not_activated',
                            message: 'User is not activated'
                        });
                    else if (message_code === 400)
                        return res.status(400).send({
                            code: 400,
                            type: 'wrong_password',
                            message: 'Wrong password'
                        });

                })(req, res);


            });


    }


}
