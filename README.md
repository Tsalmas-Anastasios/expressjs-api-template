# express-api-template

- Node version: 18

before you run the BackEnd locally, run these commands:
1. npm run install-packages
2. npm run compile
3. (from VSCode) Run & Debug "[DEV] Launch API", or (from terminal) npm run nodemon
4. (from WebStorm) Create a new "Run & Compile" configuration file:
   1. **Working Directory:** Project's absolute path
   2. **File:** node_modules/nodemon/bin/nodemon.js
   3. **Application parameters:** --inspect --watch dist --exec node dist/app.js -- --local
