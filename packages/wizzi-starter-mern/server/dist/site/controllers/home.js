/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\site\controllers\home.js.ittf
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeController = void 0;

var _express = require("express");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HomeController = /*#__PURE__*/function () {
  function HomeController() {
    _classCallCheck(this, HomeController);

    this.router = (0, _express.Router)();
  }

  _createClass(HomeController, [{
    key: "initialize",
    value: function initialize(initValues) {
      this.router.get('/', this.home);
    }
  }, {
    key: "home",
    value: function home(request, response) {
      response.render('home/index.html.ittf', {
        title: 'Site Home'
      });
    }
  }]);

  return HomeController;
}();

exports.HomeController = HomeController;