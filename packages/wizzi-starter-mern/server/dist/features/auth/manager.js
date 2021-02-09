/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\features\auth\manager.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPassport = getPassport;
exports.authenticate = authenticate;
exports.jwtAuth = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _user = require("./mongo/user");

var _local = require("./strategies/local");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jwt = require('express-jwt');

var initialized = false;

function initPassport() {
  var userModel = (0, _user.GetUserModel)();

  _passport["default"].use((0, _local.createStrategy)());

  _passport["default"].serializeUser(function (user, done) {
    console.log('features.auth.manager.serializeUser.user', user);
    done(null, user.id);
  });

  _passport["default"].deserializeUser(function (id, done) {
    console.log('features.auth.manager.deserializeUser.id', id);
    userModel.findById(id, function (err, user) {
      console.log('features.auth.manager.deserializeUser.user', user);
      done(err, user);
    });
  });

  initialized = true;
}

function getTokenFromHeaders(req) {
  var authorization = req.headers.authorization;

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }

  return null;
}

function getPassport() {
  if (initialized == false) {
    initPassport();
  }

  return _passport["default"];
}

function authenticate(strategyName, options, callback) {
  return _passport["default"].authenticate(strategyName, options, callback);
}

var jwtAuth = {
  required: jwt({
    secret: 'secret',
    algorithms: ['RS256'],
    userProperty: 'payload',
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: 'secret',
    algorithms: ['RS256'],
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
};
exports.jwtAuth = jwtAuth;