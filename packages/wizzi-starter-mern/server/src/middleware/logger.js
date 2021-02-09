/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\middleware\logger.js.ittf
*/
'use strict';
export const LoggerMiddleware = (app) =>
    app.use((request, response, next) => {
        console.log(`${new Date().toString()} ${request.method} ${request.path}`)
        next();
    });
