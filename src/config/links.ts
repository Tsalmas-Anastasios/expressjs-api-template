require('dotenv').config();


export class EnvironmentLinks {

    activation_link: string;
    request_new_password_link: string;


    constructor() {

        this.activation_link = process.env.ACCOUNT_ACTIVATION_LINK;
        this.request_new_password_link = process.env.REQUEST_NEW_PASSWORD_LINK;

    }

}
