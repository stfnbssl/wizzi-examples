/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-studio\.wizzi\ittf\server\routes\crawl.js.ittf
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
    app.put('/api/crawl/snippet', function(req, res, next) {
        console.log('put.body', JSON.stringify(req.body));
        console.log('put.params', JSON.stringify(req.params));
        var check = rest.paramsCheck(req);
        var name = check.notEmpty('body', 'name');
        var code = check.notEmpty('body', 'code');
        var ittf = check.optional('body', 'ittf');
        var mime = check.optional('body', 'mime');
        var tags = check.optional('body', 'tags');
        if (check.errors) {
            return check.sendErrors(res);
        }
        console.log('/api/crawl/snippet', name);
        api.crawl.putSnippet({
            userId: req.user.id, 
            name: name, 
            code: code, 
            ittf: ittf, 
            mime: mime, 
            tags: tags
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/crawl/snippet', result.data);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.post('/api/crawl/wizzify', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var code = check.notEmpty('body', 'code');
        var mime = check.notEmpty('body', 'mime');
        if (check.errors) {
            return check.sendErrors(res);
        }
        console.log('/api/crawl/wizzify', mime);
        api.crawl.wizzifySnippet({
            userId: req.user.id, 
            code: code, 
            mime: mime
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/crawl/wizzify', result.data);
            sendSuccess(res, result.status, result.data);
        });
    });
};
