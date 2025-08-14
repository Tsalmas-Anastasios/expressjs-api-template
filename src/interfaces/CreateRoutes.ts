import { Application } from 'express';

export interface CreateRoutes {

    createRoutes(app: Application): void;

}
