/*
    artifact generator: C:\My\wizzi\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-examples\packages\mern-starter\.wizzi\server\src\utils\response.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendFailure = exports.sendServerError = exports.sendBadRequest = exports.sendSuccess = void 0;

var sendSuccess = function sendSuccess(res, message) {
  res.status(200);
  res.type('application/json');
  res.send(message);
};

exports.sendSuccess = sendSuccess;

var sendBadRequest = function sendBadRequest(res, error) {
  return sendFailure(res, error, 400);
};

exports.sendBadRequest = sendBadRequest;

var sendServerError = function sendServerError(res, error) {
  return sendFailure(res, error, 500);
};

exports.sendServerError = sendServerError;

var sendFailure = function sendFailure(res, error, status) {
  res.status(error && error.status ? error.status : status || 500);
  res.type('application/json');
  res.send(error);
};

exports.sendFailure = sendFailure;