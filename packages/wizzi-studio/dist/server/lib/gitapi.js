/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-studio\.wizzi\ittf\server\lib\gitapi.js.ittf
*/
'use strict';
var path = require('path');
var URL = require('url').URL;
var g = require('wizzi-git');
var fsGit = g.fsGit();
var fs = fsGit.fs;
var git = fsGit.git;
module.exports = {
    clone: async ({filepath, url, name, ref, depth}) => {
        let dir = path.join(filepath, name || path.basename(url), 'origin');
        let proxyurl = url.replace(/^https?:\/\//, '');
        try {
            console.log('cloning', proxyurl);
            await git.clone({
                    fs, 
                    dir, 
                    depth: depth || 10, 
                    ref: ref || 'master', 
                    singleBranch: true, 
                    url: `https://cors-buster-jfpactjnem.now.sh/${proxyurl}`
                });
            console.log('setting config', new URL('https://' + proxyurl).hostname);
            await git.config({
                    fs, 
                    dir, 
                    path: 'remote.origin.host', 
                    value: new URL('https://' + proxyurl).hostname
                });
            return null;
        } 
        catch (ex) {
            return ex;
        } 
    }
};
