import { utilsService } from '../utilities.service';
import { SignInMethodType, SignInStatusType } from '../../types';


export class AuthenticationLoggerService {


    // log the sign ins from the users
    createSignInRecord(data: {
        account_id: string;
        status: SignInStatusType;
        method: SignInMethodType;
        auth_type: 'session' | 'jwt'
    }): void {

        // create record here
        const data_string = `[ACTION] sign_in      |       [METHOD] ${data.method}       |       [ACCOUNT ID] ${data.account_id}      |       [STATUS] ${data.status}       |       [TIMESTAMP] ${utilsService.moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}        |       [AUTHENTICATION TYPE] ${data.auth_type}`;

        utilsService.fs.writeFileSync(utilsService.path.join(__dirname, `../../logs/authentication.log`), data_string, { flag: 'a+' });

    }


    // log the sign outs from the users
    createSignOutRecord(data: {
        account_id: string;
        status: SignInStatusType;
        method: SignInMethodType;
        auth_type: 'session' | 'jwt'
    }): void {

        // create record here
        const data_string = `[ACTION] sign_out      |       [METHOD] ${data.method}       |       [ACCOUNT ID] ${data.account_id}      |       [STATUS] ${data.status}       |       [TIMESTAMP] ${utilsService.moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}        |       [AUTHENTICATION TYPE] ${data.auth_type}`;

        utilsService.fs.writeFileSync(utilsService.path.join(__dirname, `../../logs/authentication.log`), data_string, { flag: 'a+' });

    }


}
