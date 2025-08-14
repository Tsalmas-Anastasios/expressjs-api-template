import { SecretsConfig } from './secrets';
import { EnvironmentLinks } from './links';
import { ApplicationDataConfig } from './application';
import {IdentifiersConfig} from "./identifiers";

require('dotenv').config();


class Config {

    public secrets: SecretsConfig;
    // public emails: EmailsConfig;
    public links: EnvironmentLinks;
    public identifiers: IdentifiersConfig;

    public application_details: ApplicationDataConfig;


    public production: boolean;

    public nanoid_basic_alphabet: string;
    public nanoid_basic_length: number;



    constructor() {

        this.secrets = new SecretsConfig();
        // this.emails = new EmailsConfig();
        this.links = new EnvironmentLinks();
        this.identifiers = new IdentifiersConfig();

        this.application_details = new ApplicationDataConfig();


        this.production = process.env.ENVIRONMENT_MODE !== 'development';

        // basic nanoid alphabet
        this.nanoid_basic_alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^*~-_=';
        this.nanoid_basic_length = 16;



    }

}


export const config = new Config();
