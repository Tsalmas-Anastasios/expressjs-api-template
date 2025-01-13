import { accountsDb } from '../connectors/db/accounts-db';
import { utilsService } from '../utilities.service';

class StartupDevelopmentModeFunctions {


    public async deleteResponseHistory(): Promise<void> {

        console.log('');
        console.log(`Delete ${utilsService.chalk.bold('response')} history from dev database...`);


        try {
            const delete_response = await accountsDb.query(`DELETE FROM response_log`);

            console.log(utilsService.chalk.green.bold('Deletion completed successfully!'));
            console.log('');
            console.log('----------------------------------------------------------------');
            console.log('');
        } catch (error) {
            console.log(utilsService.chalk.red.bold('!!! Error occurred while deleting the history !!!'));
            console.log('Abort the process and try again!');
        }

    }



    public async deleteSystemErrorsHistory(): Promise<void> {

        console.log('');
        console.log(`Delete ${utilsService.chalk.bold('system errors')} history from dev database...`);


        try {
            const delete_response = await accountsDb.query('DELETE FROM system_errors');

            console.log(utilsService.chalk.green.bold('Deletion completed successfully!'));
            console.log('');
            console.log('----------------------------------------------------------------');
            console.log('');
        } catch (error) {
            console.log(utilsService.chalk.red.bold('!!! Error occurred while deleting the history !!!'));
            console.log('Abort the process and try again!');
        }

    }


}



export const startupDevelopmentModeFunctions = new StartupDevelopmentModeFunctions();
