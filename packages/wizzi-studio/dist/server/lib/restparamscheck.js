/*
    artifact generator: C:\My\wizzi\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-examples\packages\wizzi-studio\.wizzi\ittf\server\lib\restparamscheck.js.ittf
*/
'use strict';
// generated by v6-wizzi-js.artifacts.js.module.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var util = require('util');
var wizzi = require('wizzi');
var md = module.exports = {};
var paramsCheck = (function () {
    function paramsCheck(req) {
        _classCallCheck(this, paramsCheck);
        this.req = req;
        this.errors = null;
    }
    paramsCheck.prototype.notUndefined = function(qb, name) {
        var value = this.optional(qb, name);
        if (wizzi.verify.isUndefined(value)) {
            this.error('Parameter: "' + name + '" must have a value.');
        }
        return value;
    }
    paramsCheck.prototype.notEmpty = function(qb, name) {
        var value = this.optional(qb, name);
        if (wizzi.verify.isEmpty(value)) {
            this.error('String parameter: "' + name + '" must have a value.');
        }
        return value;
    }
    paramsCheck.prototype.notEmptyBody = function() {
        var value = this.optionalBody();
        if (wizzi.verify.isEmpty(value)) {
            this.error('The body must be not empty.');
        }
        return value;
    }
    paramsCheck.prototype.optional = function(qb, name) {
        var value;
        if (qb === 'query') {
            value = this.req.query[name];
        }
        else if (qb === 'params') {
            value = this.req.params[name];
        }
        else {
            value = this.req.body[name];
        }
        return value;
    }
    paramsCheck.prototype.optionalBody = function() {
        return this.req.body;
    }
    paramsCheck.prototype.error = function(message) {
        if (!this.errors) {
            this.errors = [];
        }
        this.errors.push(message);
    }
    paramsCheck.prototype.sendErrors = function(res) {
        res.send({
            code: 999, 
            error: this.errors
        });
    }
    return paramsCheck;
})();

md.paramsCheck = paramsCheck;
