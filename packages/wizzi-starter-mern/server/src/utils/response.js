/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\utils\response.js.ittf
*/
'use strict';
export const sendSuccess = (res, message) => {
    res.status(200);
    res.type('application/json');
    res.send(message);
};
export const sendBadRequest = (res, error) =>
    sendFailure(res, error, 400);
export const sendServerError = (res, error) =>
    sendFailure(res, error, 500);
export const sendFailure = (res, error, status) => {
    res.status(error && error.status ? error.status : status || 500)
    res.type('application/json');
    res.send(error);
};
