/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-netlify\.wizzi\src\App.js.ittf
*/
'use strict';
import express from 'express';
const serverless = require('serverless-http');
import 'babel-polyfill';
import {config} from '../features/config';
import {appMiddlewares} from '../middleware';
class App {
    constructor(initValues) {
        this.config = initValues.config;
        this.port = this.config.port;
        this.app = express();
        initValues.middlewares.forEach((middleware) =>
            middleware(this.app))
        initValues.controllers.forEach((controller) => {
            console.log('installing router on path: ', controller.path);
            controller.initialize(initValues);
            this.app.use('/', controller.router);
        })
    }
    listen(port) {
        var usedPort = port || this.port;
        this.app.listen(usedPort, () =>
            console.log(`App listening at http://localhost:${port}`))
    }
}
