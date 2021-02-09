/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\middleware\passport.js.ittf
*/
'use strict';
import { manager as authManager } from '../features/auth';
export const PassportMiddleware = (app) => {
    const passport = authManager.getPassport();
    app.use(passport.initialize())
    app.use(passport.session())
};
