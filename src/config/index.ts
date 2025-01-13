import { SecretsConfig } from './secrets';
import { EnvironmentLinks } from './links';
import { ApplicationDataConfig } from './application';

require('dotenv').config();


class Config {

    public secrets: SecretsConfig;
    // public emails: EmailsConfig;
    public links: EnvironmentLinks;


    public application_details: ApplicationDataConfig;


    public production: boolean;

    public nanoid_basic_alphabet: string;
    public nanoid_basic_length: number;

    public account_id_alphabet: string;
    public account_id_length: number;

    public company_id_alphabet: string;
    public company_id_length: number;

    public employee_id_alphabet: string;
    public employee_id_length: number;


    constructor() {

        this.secrets = new SecretsConfig();
        // this.emails = new EmailsConfig();
        this.links = new EnvironmentLinks();
        this.application_details = new ApplicationDataConfig();


        this.production = process.env.ENVIRONMENT_MODE !== 'development';

        // basic nanoid alphabet
        this.nanoid_basic_alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^*~-_=';
        this.nanoid_basic_length = 16;

        this.account_id_alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890%^*-_';
        this.account_id_length = 36;

        this.company_id_alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890%^*-_';
        this.company_id_length = 36;

        this.employee_id_alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890%^*-_';
        this.employee_id_length = 36;

    }

}


export const config = new Config();
