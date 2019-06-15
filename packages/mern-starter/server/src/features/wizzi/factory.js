/*
    artifact generator: C:\My\wizzi\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-examples\packages\mern-starter\.wizzi\server\src\features\wizzi\factory.js.ittf
*/
'use strict';
import * as path from 'path';
import * as wizzi from 'wizzi';
export async function createFilesystemFactory(globalContext) {
    const gc = {};
    return new Promise((resolve, reject) =>
            wizzi.fsFactory({
                plugins: {
                    items: [
                        'wizzi-core', 
                        'wizzi-js', 
                        'wizzi-web'
                    ]
                }, 
                globalContext: Object.assign({}, gc, globalContext || {})
            }, function(err, wf) {
                if (err) {
                    return reject(err);
                }
                resolve(wf)}));
}
