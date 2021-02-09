/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\features\auth\strategies\github.js.ittf
*/
'use strict';
import { Strategy } from 'passport-github2';
import { GetUserModel } from '../mongo/user';
import { GetAccountModel } from '../mongo/account';
import { config } from '../../config';
let userModel = null;
let accountModel = null;
export function createStrategy() {
    userModel = GetUserModel();
    accountModel = GetAccountModel();
    console.log('features.auth.strategies.github.createStrategy');
    return new Strategy({
            clientID: config.githubClientID, 
            clientSecret: config.githubClientSecret, 
            callbackURL: config.githubCallbackURL, 
            passReqToCallback: true
        }, function(req, accessToken, refreshToken, profile, done) {
            console.log('features.auth.strategies.github.req.session.socketId,socketUserId', req.session.socketId, req.session.socketUserId);
            console.log('features.auth.strategies.github.req.sessionID,session', req.sessionID, req.session);
            console.log('features.auth.strategies.github.req.user', req.user);
            console.log('features.auth.strategies.github.accessToken.refreshToken', accessToken, refreshToken);
            console.log('features.auth.strategies.github.profile', profile);
            var account = new accountModel();
            account.domain = 'github.com';
            account.uid = profile.id;
            account.username = profile.username;
            account.displayName = profile.displayName;
            account.avatar_url = profile._json.avatar_url;
            var t = {
                kind: 'oauth', 
                token: accessToken, 
                attributes: {
                    refreshToken: refreshToken
                }
            };
            account.tokens.push(t);
            return done(null, account);
        });
}
