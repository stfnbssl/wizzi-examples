/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\site\index.js.ittf
*/
'use strict';
import {HomeController} from './controllers/home';
import {AuthController} from './controllers/auth';
const siteControllers = [
    new HomeController(), 
    new AuthController()
];
export {siteControllers};
