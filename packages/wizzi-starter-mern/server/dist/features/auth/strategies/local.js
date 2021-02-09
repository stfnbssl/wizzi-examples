/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\features\auth\strategies\local.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStrategy = createStrategy;

var _passportLocal = require("passport-local");

var _user = require("../mongo/user");

var _config = require("../../config");

var userModel = null;

function createStrategy() {
  userModel = (0, _user.GetUserModel)();
  console.log('features.auth.strategies.local.createStrategy');
  return new _passportLocal.Strategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
  }, function (email, password, done) {
    console.log('features.auth.strategies.local.verify.email,password', email, password);
    userModel.findOne({
      email: email
    }).then(function (user) {
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
    })["catch"](done);
  });
}