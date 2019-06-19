/*
    artifact generator: C:\My\wizzi\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-examples\packages\mern-starter\.wizzi\server\src\features\blog\mongo\post.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetPostModel = GetPostModel;
exports.PostModelBuilder = void 0;

var _mongoose = require("mongoose");

var Post = new _mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  author: {
    type: String
  }
}, {
  collection: 'posts'
});
var postModel = null;

function GetPostModel() {
  return postModel;
}

var PostModelBuilder = {
  buildModel: function buildModel() {
    return postModel = (0, _mongoose.model)('Post', Post);
  }
};
exports.PostModelBuilder = PostModelBuilder;