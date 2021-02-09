/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\features\auth\index.js.ittf
*/
'use strict';
import {UserModelBuilder, UserModel} from './mongo/user';
import {TokenModelBuilder, TokenModel} from './mongo/token';
import {AccountModelBuilder, AccountModel} from './mongo/account';
import {AuthController} from './controllers/auth';
import * as manager from './manager';
const authModels = {
    UserModel, 
    TokenModel, 
    AccountModel
};
const authModelBuilders = [
    UserModelBuilder, 
    TokenModelBuilder, 
    AccountModelBuilder
];
const authControllers = [
    new AuthController()
];
export {authModels, authModelBuilders, authControllers, manager};
