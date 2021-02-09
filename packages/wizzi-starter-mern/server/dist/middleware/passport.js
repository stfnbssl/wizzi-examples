/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\middleware\passport.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PassportMiddleware = void 0;

var _auth = require("../features/auth");

var PassportMiddleware = function PassportMiddleware(app) {
  var passport = _auth.manager.getPassport();

  app.use(passport.initialize());
  app.use(passport.session());
};

exports.PassportMiddleware = PassportMiddleware;