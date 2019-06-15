/*
    artifact generator: C:\My\wizzi\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-examples\packages\mern-starter\.wizzi\server\src\features\blog\index.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blogControllers = exports.blogModelBuilders = exports.blogModels = void 0;

var _post = require("./mongo/post");

var _post2 = require("./controllers/post");

var blogModels = {
  PostModel: _post.PostModel
};
exports.blogModels = blogModels;
var blogModelBuilders = [_post.PostModelBuilder];
exports.blogModelBuilders = blogModelBuilders;
var blogControllers = [new _post2.PostController()];
exports.blogControllers = blogControllers;