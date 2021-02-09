/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\middleware\session.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionMiddleware = void 0;

var _express = require("express");

var _mongoose = require("mongoose");

var _config = require("../features/config");

var session = require('express-session');

var mongoSessionStore = require('connect-mongo');

var SessionMiddleware = function SessionMiddleware(app) {
  var MongoStore = mongoSessionStore(session);
  var cookieOptions = {
    // serve secure cookies, requires https
    secure: app.get('env') === 'production' ? true : false,
    httpOnly: true,
    // expires in 14 days
    maxAge: 14 * 24 * 60 * 60 * 1000
  };
  var sessionOptions = {
    name: 'wizzi-starter-mern-server.sid',
    secret: _config.config.sessionSecret,
    algorithms: ['RS256'],
    store: new MongoStore({
      mongooseConnection: _mongoose.connection,
      // save session 14 days
      ttl: 14 * 24 * 60 * 60
    }),
    cookie: cookieOptions,
    resave: false,
    saveUninitialized: false
  }; //

  app.use(session(sessionOptions));
};

exports.SessionMiddleware = SessionMiddleware;