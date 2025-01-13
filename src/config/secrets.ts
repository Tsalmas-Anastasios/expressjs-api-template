require('dotenv').config();


export class SecretsConfig {

    public account_activation_key: string;
    public account_change_password_key: string;


    // google oauth identifiers
    public google_oauth_login_client_id: string;
    public google_oauth_login_client_secret: string;



    constructor() {

        this.account_activation_key = process.env.SECRET_KEY_FOR_ACCOUNT_ACTIVATION;
        this.account_change_password_key = process.env.SECRET_KEY_FOR_ACCOUNT_CHANGE_PASSWORD;

        this.google_oauth_login_client_id = process.env.GOOGLE_OAUTH_LOGIN_CLIENT_ID;
        this.google_oauth_login_client_secret = process.env.GOOGLE_OAUTH_LOGIN_CLIENT_SECRET;

    }

}
