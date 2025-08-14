import { spawn } from 'child_process';
import * as waitOn from 'wait-on';
import * as request from 'supertest';


require('dotenv').config();


let serverProcess: any = null;
const SERVER_URL = `https://localhost:${ process.env.BACKEND_PORT }`;


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
global.__TEST_SESSION__ = '';


beforeAll(async () => {

    serverProcess = spawn('node', ['dist/app.js'], { stdio: 'inherit' });
    await waitOn({ resources: [`${ SERVER_URL }/`], timeout: 5000 });

});


afterAll(async () => {

    if (serverProcess)
        serverProcess.kill();

});
