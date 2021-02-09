/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\features\auth\strategies\github.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStrategy = createStrategy;

var _passportGithub = require("passport-github2");

var _user = require("../mongo/user");

var _account = require("../mongo/account");

var _config = require("../../config");

var userModel = null;
var accountModel = null;

function createStrategy() {
  userModel = (0, _user.GetUserModel)();
  accountModel = (0, _account.GetAccountModel)();
  console.log('features.auth.strategies.github.createStrategy');
  return new _passportGithub.Strategy({
    clientID: _config.config.githubClientID,
    clientSecret: _config.config.githubClientSecret,
    callbackURL: _config.config.githubCallbackURL,
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
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