/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-netlify\.wizzi\src\middleware\netlifyServer.js.ittf
*/
'use strict';
import {NetlifyRouter} from '../features/netlify';
export const NetlifyServerMiddleware = (app) =>
    app.use('/.netlify/functions/server', NetlifyRouter);
