/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-netlify\.wizzi\src\middleware\index.js.ittf
*/
'use strict';
import { BodyParserMiddleware } from './bodyParser';
import { CacheControlMiddleware } from './cacheControl';
import { NetlifyServerMiddleware } from './netlifyServer';
import { WizziViewEngineMiddleware } from './wizziViewEngine';
import { ErrorsMiddleware } from './errors';
export const appMiddlewares = [
    BodyParserMiddleware, 
    CacheControlMiddleware, 
    NetlifyServerMiddleware, 
    WizziViewEngineMiddleware, 
    ErrorsMiddleware
];
