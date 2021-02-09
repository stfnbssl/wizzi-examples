/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\features\auth\manager.js.ittf
*/
'use strict';
import passport from 'passport';
const jwt = require('express-jwt');
import { GetUserModel } from './mongo/user';
import { createStrategy as createLocalStrategy } from './strategies/local';
let initialized = false;
function initPassport() {
    const userModel = GetUserModel();
    passport.use(createLocalStrategy())
    passport.serializeUser(function(user, done) {
        console.log('features.auth.manager.serializeUser.user', user);
        done(null, user.id);
    })
    passport.deserializeUser(function(id, done) {
        console.log('features.auth.manager.deserializeUser.id', id);
        userModel.findById(id, function(err, user) {
            console.log('features.auth.manager.deserializeUser.user', user);
            done(err, user);
        })
    })
    initialized = true;
}
function getTokenFromHeaders(req) {
    const {
        headers: {
            authorization
        }
    } = req;
    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
}
export function getPassport() {
    if (initialized == false) {
        initPassport();
    }
    return passport;
}
export function authenticate(strategyName, options, callback) {
    return passport.authenticate(strategyName, options, callback);
}
export const jwtAuth = {
    required: jwt({
        secret: 'secret', 
        algorithms: [
            'RS256'
        ], 
        userProperty: 'payload', 
        getToken: getTokenFromHeaders
    }), 
    optional: jwt({
        secret: 'secret', 
        algorithms: [
            'RS256'
        ], 
        userProperty: 'payload', 
        getToken: getTokenFromHeaders, 
        credentialsRequired: false
    })
};
