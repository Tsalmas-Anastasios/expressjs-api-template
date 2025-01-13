import { utilsService } from '../lib/utilities.service';
import * as moment from 'moment-timezone';

require('dotenv').config();


export class ApplicationDataConfig {

    public application_name: string;
    public application_provider: string;
    public copyright: {
        statement: string;
        response_statement: string;
    };


    constructor() {

        this.application_name = process.env.APPLICATION_NAME;
        this.application_provider = process.env.APPLICATION_PROVIDER;

        this.copyright = {
            statement: 'COPYRIGHT STATEMENT AND INFORMATION HERE',
            response_statement: `${this.application_name} © 2024 - ${moment().format('YYYY')} | ${this.application_provider}`,
        };

    }

}



