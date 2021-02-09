/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\features\auth\mongo\user.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserModel = GetUserModel;
exports.UserModelBuilder = void 0;

var _mongoose = require("mongoose");

var crypto = require('crypto');

var jwt = require('jsonwebtoken');

var UserSchema = new _mongoose.Schema({
  userName: {
    type: String
  },
  realName: {
    type: String
  },
  email: {
    type: String
  },
  hash: {
    type: String
  },
  salt: {
    type: String
  }
}, {
  collection: 'users'
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  console.log('features.auth.mongo.user.setPassword.salt,hash', this.salt, this.hash);
};

UserSchema.methods.validatePassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  console.log('features.auth.mongo.user.validatePassword.hash,this.hash', hash, this.hash);
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
  var today = new Date();
  var expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10)
  }, 'secret');
};

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT()
  };
};

var userModel = null;

function GetUserModel() {
  return userModel;
}

var UserModelBuilder = {
  buildModel: function buildModel() {
    return userModel = (0, _mongoose.model)('User', UserSchema);
  }
};
exports.UserModelBuilder = UserModelBuilder;