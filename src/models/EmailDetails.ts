export class EmailDetails {

    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        password: string;
    };
    defaults: {
        name: string;
        email: string
    };


    constructor(props?: EmailDetails) {

        this.host = props?.host || null;
        this.port = props?.port || null;
        this.secure = props?.secure ? true : false;
        this.auth = props?.auth || null;
        this.defaults = props?.defaults || null;

    }

}
