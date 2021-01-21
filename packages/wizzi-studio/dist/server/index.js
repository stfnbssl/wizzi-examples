/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-studio\.wizzi\ittf\server\index.js.ittf
*/
'use strict';

var server = require('./server');

/**
    start the wizzi RunnerServer.
     It requires the module wizzifile.js in the
     current process.cwd()
*/
require('wizzi').startRunnerServer({
    cwd: __dirname, 
    userid: 'stefi', 
    role: 'admin'
}, function(err) {
    if (err) {
        console.log('wizzi-studio/index error', err);
        throw new Error(err);
    }
    server.start(function(err) {
        if (err) {
            console.log('wizzi-studio/index error', err);
            throw new Error(err);
        }
    });
});
