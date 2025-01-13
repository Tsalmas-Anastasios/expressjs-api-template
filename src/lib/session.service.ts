import { accountsDb } from './connectors/db/accounts-db';



class SessionDataGetService {


    async getSessionData(account_id: string): Promise<{ session_id: string, expires: number, data: any }> {

        // get the session data here
        const session_data: { session_id: string, expires: number, data: any } = { session_id: null, expires: null, data: null };
        try {

            const result = await accountsDb.query(`
                SELECT
                    *
                FROM
                    sessions
                WHERE
                    data LIKE '%"account_id":"${account_id}",%'
                LIMIT 1;
            `);


            if (result.rowsCount === 0)
                return Promise.resolve(session_data);


            session_data.session_id = result.rows[0].sid.toString();
            session_data.expires = Number(result.rows[0].expires);
            session_data.data = JSON.parse(result.rows[0].data);


            return Promise.resolve(session_data);

        } catch (error) {
            return Promise.reject(error);
        }

    }


}




export const sessionDataGetService = new SessionDataGetService();
