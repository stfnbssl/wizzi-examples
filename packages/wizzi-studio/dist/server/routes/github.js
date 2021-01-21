/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-studio\.wizzi\ittf\server\routes\github.js.ittf
*/
'use strict';

/**
     Router: Crawl
*/

// Dependencies
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var rest = require('../lib/rest');
var u = require('../lib/utils');

/**
     Helpers
*/
function sendError(res, err, options) {
    rest.sendError(res, err, options);
}

function sendSuccess(res, result, options) {
    rest.sendSuccess(res, result, options);
}
/**
     Routes
*/
module.exports = function(app, api) {
    var crawlApi = api.crawl;
    app.get('/api/github/clone', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var url = check.notEmpty('query', 'url');
        var name = check.optional('query', 'name');
        if (check.errors) {
            return check.sendErrors(res);
        }
        console.log('/api/github/clone', url);
        api.github.getClone({
            userId: req.user.id, 
            url: url, 
            name: name
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/github/clone', result.data);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/github/wizzify', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var name = check.notEmpty('query', 'name');
        var folder = check.optional('query', 'folder');
        if (check.errors) {
            return check.sendErrors(res);
        }
        console.log('/api/github/wizzify', name);
        api.github.wizzifyClone({
            userId: req.user.id, 
            name: name, 
            folder: folder
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/github/wizzify', result.data);
            sendSuccess(res, result.status, result.data);
        });
    });
};
