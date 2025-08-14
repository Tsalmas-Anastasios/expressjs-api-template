import * as request from 'supertest';


require('dotenv').config();


const SERVER_URL = `https://localhost:${ process.env.BACKEND_PORT }`;

describe('Index Routes', () => {


    // index route ('/')
    it('Route: / , Returned Status: 200', async () => {
        const res = await request(SERVER_URL).get('/');
        expect(res.status).toBe(200);
    });


});
