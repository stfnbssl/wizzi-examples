/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\index.js.ittf
*/
'use strict';
import 'babel-polyfill';
import {config} from './features/config';
import mongodbStart from './services/mongodb';
import { siteControllers } from './site';
import {authControllers, authModelBuilders} from './features/auth';
import {blogControllers, blogModelBuilders} from './features/blog';
import {appMiddlewares} from './middleware';
import App from './App';
async function start() {
    let modelBuilders = [
        ...authModelBuilders, 
        ...blogModelBuilders
    ];
    await mongodbStart(config, modelBuilders);
    let middlewares = [
        ...appMiddlewares
    ];
    let controllers = [
        ...siteControllers, 
        ...authControllers, 
        ...blogControllers
    ];
    const appInitializer = {
        config, 
        controllers, 
        middlewares
    };
    const app = new App(appInitializer);
    app.listen();
}
try {
    start();
} 
catch (ex) {
    console.log(ex);
} 
