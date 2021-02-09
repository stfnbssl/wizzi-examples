/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\features\auth\storage.js.ittf
*/
'use strict';
export function setTokens(token, refreshToken) {
    console.log('features.auth.storage.setTokens.token, refreshToken', token, refreshToken);
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);
}
export function getTokens() {
    return {
            token: localStorage.getItem('token'), 
            refreshToken: localStorage.getItem('refresh_token')
        };
}
export function removeTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
}
