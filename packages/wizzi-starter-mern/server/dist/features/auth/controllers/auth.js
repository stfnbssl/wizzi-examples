/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\features\auth\controllers\auth.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthController = void 0;

var _express = require("express");

var _response = require("../../../utils/response");

var _user2 = require("../mongo/user");

var _manager = require("../manager");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthController = /*#__PURE__*/function () {
  function AuthController() {
    _classCallCheck(this, AuthController);

    this.path = '/api/v1/auth';
    this.router = (0, _express.Router)();
    this.userModel = null;
  }

  _createClass(AuthController, [{
    key: "initialize",
    value: function initialize(initValues) {
      console.log('Entering AuthController.initialize');
      this.userModel = (0, _user2.GetUserModel)();
      this.router.get("".concat(this.path, "/login"), this.login.bind(this));
      this.router.post("".concat(this.path, "/local/register"), _manager.jwtAuth.optional, this.localRegister.bind(this));
      this.router.post("".concat(this.path, "/local/login"), _manager.jwtAuth.optional, this.localLogin.bind(this));
      this.router.get("".concat(this.path, "/local/profile"), _manager.jwtAuth.required, this.localProfile.bind(this));
    }
  }, {
    key: "login",
    value: function login(req, res, next) {
      res.send('Go back and register!');
    }
  }, {
    key: "github",
    value: function github(req, res, next) {// The request will be redirected to GitHub for authentication, so this
      // function will not be called.
    }
  }, {
    key: "githubCallback",
    value: function githubCallback(req, res, next) {
      // Successful authentication
      console.log('features.auth.controllers.auth.githubCallback.req.user', req.user);
      res.json(req.user);
    }
  }, {
    key: "localLogin",
    value: function localLogin(req, res, next) {
      var user = req.body.user;

      if (!user.email) {
        return (0, _response.sendBadRequest)(res, {
          errors: {
            email: 'is required'
          }
        }, 422);
      }

      if (!user.password) {
        return (0, _response.sendBadRequest)(res, {
          errors: {
            password: 'is required'
          }
        }, 422);
      }

      console.log('features.auth.controllers.auth.localLogin.email,password', user.email, user.password);
      return (0, _manager.authenticate)('local', {
        session: false
      }, function (err, passportUser, info) {
        if (err) {
          console.log('features.auth.controllers.auth.localLogin.err', err);
          return next(err);
        }

        console.log('features.auth.controllers.auth.localLogin.passportUser,info', passportUser, info);

        if (passportUser) {
          var _user = passportUser;
          _user.token = passportUser.generateJWT();
          console.log('features.auth.controllers.auth.localLogin.token', _user.token);
          return (0, _response.sendSuccess)(res, {
            user: _user.toAuthJSON()
          });
        }

        return (0, _response.sendBadRequest)(res, info);
      })(req, res, next);
    }
  }, {
    key: "localRegister",
    value: function localRegister(req, res, next) {
      var user = req.body.user;

      if (!user.email) {
        return (0, _response.sendBadRequest)(res, {
          errors: {
            email: 'is required'
          }
        }, 422);
      }

      if (!user.password) {
        return (0, _response.sendBadRequest)(res, {
          errors: {
            password: 'is required'
          }
        }, 422);
      }

      console.log('features.auth.controllers.auth.localRegister.email,password', user.email, user.password);
      var registeredUser = new this.userModel(user);
      registeredUser.setPassword(user.password);
      return registeredUser.save().then(function () {
        return (0, _response.sendSuccess)(res, {
          user: registeredUser.toAuthJSON()
        });
      });
    }
  }, {
    key: "localProfile",
    value: function localProfile(req, res, next) {
      console.log('features.auth.controllers.auth.localProfile.req.payload', req.payload);
      var id = req.payload.id;
      return this.userModel.findById(id).then(function (user) {
        console.log('features.auth.controllers.auth.localProfile.user', user);

        if (!user) {
          (0, _response.sendBadRequest)(res, {
            message: 'User not found'
          });
        }

        return (0, _response.sendSuccess)(res, {
          user: user.toAuthJSON()
        });
      });
    }
  }]);

  return AuthController;
}();

exports.AuthController = AuthController;