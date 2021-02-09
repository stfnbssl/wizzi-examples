/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\features\auth\strategies\local.js.ittf
*/
'use strict';
import { Strategy } from 'passport-local';
import { GetUserModel } from '../mongo/user';
import { config } from '../../config';
let userModel = null;
export function createStrategy() {
    userModel = GetUserModel();
    console.log('features.auth.strategies.local.createStrategy');
    return new Strategy({
            usernameField: 'user[email]', 
            passwordField: 'user[password]'
        }, (email, password, done) => {
            console.log('features.auth.strategies.local.verify.email,password', email, password);
            userModel.findOne({
                email
            }).then((user) => {
                if (!user || !user.validatePassword(password)) {
                    console.log('features.auth.strategies.local.verify.false');
                    return done(null, false, {
                            errors: {
                                'email or password': 'is invalid'
                            }
                        });
                }
                console.log('features.auth.strategies.local.verify.true.user', user);
                return done(null, user);
            }).catch(done)
        });
}
