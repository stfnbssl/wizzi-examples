/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\site\index.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.siteControllers = void 0;

var _home = require("./controllers/home");

var _auth = require("./controllers/auth");

var siteControllers = [new _home.HomeController(), new _auth.AuthController()];
exports.siteControllers = siteControllers;