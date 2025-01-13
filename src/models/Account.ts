import { AccountTypeType } from '../types';


export class Account {

    // define the required fields
    public static required_fields: string[] = [
        'username',
        'first_name',
        'last_name',
        'email',
        'phone',
        'account_type',
    ];

    // define the fields that will be used to create the sql query string
    public static database_query_fields: string[] = [
        'account_id',
        'username',
        'first_name',
        'last_name',
        'email',
        'phone',
        'password',
        'profile_picture_url',
        'account_type',
        'activated',
        'request_password_change',
        'authentication_2fa__app',
        'authentication_2fa__app_secret',
        'authentication_2fa__email',
        'authentication_2fa__phone',
    ];


    account_id?: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password?: string;
    profile_picture_url?: string;
    account_type: AccountTypeType;

    activated?: boolean;
    request_password_change?: boolean;
    authentication_2fa__app?: boolean;
    authentication_2fa__app_secret?: string;
    authentication_2fa__email?: boolean;
    authentication_2fa__phone?: boolean;
    created_at?: string | Date;
    updated_at?: string | Date;

    constructor(props?: Account) {

        this.account_id = props?.account_id || null;
        this.username = props?.username || null;
        this.first_name = props?.first_name || null;
        this.last_name = props?.last_name || null;
        this.email = props?.email || null;
        this.phone = props?.phone || null;
        this.password = props?.password || null;
        this.profile_picture_url = props?.profile_picture_url || null;
        this.account_type = props?.account_type || null;

        this.activated = props?.activated ? true : false;
        this.request_password_change = props?.request_password_change ? true : false;
        this.authentication_2fa__app = props?.authentication_2fa__app ? true : false;
        this.authentication_2fa__app_secret = props?.authentication_2fa__app_secret || null;
        this.authentication_2fa__email = props?.authentication_2fa__email ? true : false;
        this.authentication_2fa__phone = props?.authentication_2fa__phone ? true : false;
        this.created_at = props?.created_at || null;
        this.updated_at = props?.updated_at || null;

    }

}
