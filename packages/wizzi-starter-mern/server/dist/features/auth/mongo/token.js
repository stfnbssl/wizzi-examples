/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\features\auth\mongo\token.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetTokenModel = GetTokenModel;
exports.TokenModelBuilder = exports.TokenSchema = void 0;

var _mongoose = require("mongoose");

var TokenSchema = new _mongoose.Schema({
  kind: {
    type: String
  },
  token: {
    type: String
  },
  attributes: {
    type: Map,
    of: String
  }
});
exports.TokenSchema = TokenSchema;
var tokenModel = null;

function GetTokenModel() {
  return tokenModel;
}

var TokenModelBuilder = {
  buildModel: function buildModel() {
    return tokenModel = (0, _mongoose.model)('Token', TokenSchema);
  }
};
exports.TokenModelBuilder = TokenModelBuilder;