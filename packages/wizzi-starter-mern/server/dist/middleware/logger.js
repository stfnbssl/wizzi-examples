/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\middleware\logger.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoggerMiddleware = void 0;

var LoggerMiddleware = function LoggerMiddleware(app) {
  return app.use(function (request, response, next) {
    console.log("".concat(new Date().toString(), " ").concat(request.method, " ").concat(request.path));
    next();
  });
};

exports.LoggerMiddleware = LoggerMiddleware;