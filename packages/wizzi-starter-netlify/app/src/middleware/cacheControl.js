/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-netlify\.wizzi\src\middleware\cacheControl.js.ittf
*/
'use strict';
import {config} from '../features/config';
export const CacheControlMiddleware = (app) => {
    if (config.noCache) {
        app.use((req, res, next) => {
            res.set('Cache-Control', 'no-store');
            next();
        })
    }
};
