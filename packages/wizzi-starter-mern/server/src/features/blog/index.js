/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\features\blog\index.js.ittf
*/
'use strict';
import {PostModelBuilder, PostModel} from './mongo/post';
import {PostController} from './controllers/post';
const blogModels = {
    PostModel
};
const blogModelBuilders = [
    PostModelBuilder
];
const blogControllers = [
    new PostController()
];
export {blogModels, blogModelBuilders, blogControllers};
