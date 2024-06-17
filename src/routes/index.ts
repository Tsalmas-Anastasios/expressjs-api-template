import { Application, Request, Response } from 'express';



export class IndexRoutes {

    public routes(app: Application): void {


        app.route('/')
            .get(async (req: Request, res: Response) => {

                return res.status(200).send({ message: 'Hi, this is the personal toolbox API that created by Tsalmas Anastasios! Have fun and enjoy it!' });

            });


    }

}
