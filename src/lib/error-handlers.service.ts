import { config } from '../config';


export class ErrorHandlerService {


    public error500(error: any): any {

        if (!config.production)
            return error;
        else
            return 'Unexpected error occurred. Please try again later or contact Schillz support';

    }


}
