/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\features\blog\controllers\post.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostController = void 0;

var _express = require("express");

var _response = require("../../../utils/response");

var _post = require("../mongo/post");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PostController = /*#__PURE__*/function () {
  function PostController() {
    _classCallCheck(this, PostController);

    this.path = '/api/v1/posts';
    this.router = (0, _express.Router)();
    this.postModel = null;
  }

  _createClass(PostController, [{
    key: "initialize",
    value: function initialize(initValues) {
      console.log('Entering PostController.initialize');
      this.postModel = (0, _post.GetPostModel)();
      this.router.get("".concat(this.path), this.getPosts.bind(this));
      this.router.post("".concat(this.path), this.createPost.bind(this));
      this.router.get("".concat(this.path, "/:id"), this.getPostById.bind(this));
      this.router.put("".concat(this.path, "/:id"), this.updatePost.bind(this));
      this.router["delete"]("".concat(this.path, "/:id"), this.deletePost.bind(this));
    }
  }, {
    key: "getPosts",
    value: function getPosts(req, res) {
      this.postModel.find(function (err, posts) {
        if (err) {
          console.log('getPosts.err', posts);
          return (0, _response.sendFailure)(res, err);
        } else {
          console.log('getPosts.posts', posts);
          (0, _response.sendSuccess)(res, {
            posts: posts
          });
        }
      });
    }
  }, {
    key: "createPost",
    value: function createPost(req, res) {
      console.log('Entering PostController.createPost', this);
      var post = new this.postModel(req.body);
      post.save().then(function (post) {
        return (0, _response.sendSuccess)(res, {
          'message': 'Post created successfully'
        });
      })["catch"](function (err) {
        return (0, _response.sendFailure)(res, {
          message: "Post could not be created.",
          err: err
        });
      });
    }
  }, {
    key: "getPostById",
    value: function getPostById(req, res) {
      var id = req.params.id;
      this.postModel.findById(id, function (err, post) {
        if (err) {
          return (0, _response.sendFailure)(res, err);
        }

        (0, _response.sendSuccess)(res, {
          post: post
        });
      });
    }
  }, {
    key: "updatePost",
    value: function updatePost(req, res) {
      var id = req.params.id;
      this.postModel.findById(id, function (err, post) {
        if (err) {
          return (0, _response.sendFailure)(res, err);
        }

        if (!post) {
          return (0, _response.sendFailure)(res, {
            message: 'Post data not found'
          }, 404);
        } else {
          post.title = req.body.title;
          post.content = req.body.content;
          post.author = req.body.author;
          post.save().then(function (post) {
            return (0, _response.sendSuccess)(res, {
              message: 'Post update complete.'
            });
          })["catch"](function (err) {
            return (0, _response.sendFailure)(res, {
              message: 'Post could not be updated.',
              err: err
            }, 400);
          });
        }
      });
    }
  }, {
    key: "deletePost",
    value: function deletePost(req, res) {
      var id = req.params.id;
      this.postModel.findByIdAndRemove({
        _id: id
      }, function (err, post) {
        if (err) {
          return (0, _response.sendFailure)(res, err);
        } else {
          (0, _response.sendSuccess)(res, {
            message: 'Post successfully removed'
          });
        }
      });
    }
  }]);

  return PostController;
}();

exports.PostController = PostController;