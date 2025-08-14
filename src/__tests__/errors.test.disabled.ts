import * as request from 'supertest';


require('dotenv').config();


const SERVER_URL = `https://localhost:${ process.env.BACKEND_PORT }`;


describe('Error Routes', () => {


    // error 404
    it('Route: *, Returned Status: 404', async () => {
        const res = await request(SERVER_URL).get('/404');
        expect(res.status).toBe(404);
    });


});
