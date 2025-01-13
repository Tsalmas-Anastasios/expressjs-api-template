import { GeolocationDetails } from './GeolocationDetails';

export class LoginGeolocationDetails extends GeolocationDetails {

    // define the fields that will be used to create the sql query string
    public static database_query_fields: string[] = [
        ...super.database_query_fields,
        'login_id',
        'account_id',
        'session_id',
        'expires',
        'session_data'
    ];


    login_id?: number;
    account_id: string;
    session_id: string;
    expires: string | Date;
    session_data: string;


    constructor(props?: LoginGeolocationDetails) {

        super(props || null);

        this.login_id = props?.login_id || null;
        this.account_id = props?.account_id || null;
        this.session_id = props?.session_id || null;
        this.expires = props?.expires || null;
        this.session_data = props?.session_data || null;

    }

}
