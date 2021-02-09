/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\middleware\index.js.ittf
*/
'use strict';
import { LoggerMiddleware } from './logger';
import { CorsMiddleware } from './cors';
import { BodyParserMiddleware } from './bodyParser';
import { SessionMiddleware } from './session';
import { PassportMiddleware } from './passport';
import { IttfDocumentsMiddleware } from './ittf';
import { WizziViewEngineMiddleware } from './wizziViewEngine';
import { ErrorsMiddleware } from './errors';
export const appMiddlewares = [
    LoggerMiddleware, 
    CorsMiddleware, 
    BodyParserMiddleware, 
    SessionMiddleware, 
    PassportMiddleware, 
    IttfDocumentsMiddleware, 
    WizziViewEngineMiddleware
];
