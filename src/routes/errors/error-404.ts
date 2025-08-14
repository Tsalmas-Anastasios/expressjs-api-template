import { Application, Request, Response } from 'express';
import { CreateRoutes } from '../../interfaces';


export class Error404Routes implements CreateRoutes {


    public createRoutes(app: Application): void {


        app.route('*')
            .all((req: Request, res: Response) => {

                return res.status(404).send({
                    code: 404,
                    type: 'page_not_found',
                    message: 'Page didn\'t be found in the available set of routes',
                });

            });


    }


}
