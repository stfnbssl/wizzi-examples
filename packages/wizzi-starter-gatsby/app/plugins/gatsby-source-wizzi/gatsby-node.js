/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\plugins\gatsby-source-wizzi\gatsby-node.js.ittf
*/
'use strict';
var path = require('path');
var fs = require('fs');
var async = require('async');
var cheatsheets = require('./cheatsheets');
function getCheatSheetFolders(folderPath, callback) {
    console.log('getCheatSheetFolders.folderPath', folderPath);
    fs.readdir(folderPath, function(err, items) {
        if (err) {
            return callback(err);
        }
        var ret = [];
        var i, i_items=items, i_len=items.length, item;
        for (i=0; i<i_len; i++) {
            item = items[i];
            // if item.endsWith('.meta.ittf') && item.indexOf('\\t\\') < 0
            ret.push(item);
        }
        return callback(null, ret);
    });
}
exports.sourceNodes = ({ actions, createNodeId, createContentDigest  }, options) => {
    const { createNode } = actions;
    return new Promise((resolve, reject) =>
            getCheatSheetFolders(options.src, function(err, folders) {
                if (err) {
                    console.log('getCheatSheetFolders.err', err);
                    return reject(err);
                }
                console.log('getCheatSheetFolders.folders', folders);
                async.mapSeries(folders, (folder, callback) => {
                    console.log('gatsby-source-wizzi', folder);
                    cheatsheets.loadCheatsheet(path.join(options.src, folder, 'index.meta.ittf'), function(err, result) {
                        if (err) {
                            console.log('cheatsheets.result', result);
                            return callback(err);
                        }
                        createNode({
                            csName: folder, 
                            slug: folder, 
                            id: createNodeId(`cs-folder-${folder}`), 
                            parent: null, 
                            children: [], 
                            internal: {
                                type: 'Cheatsheet', 
                                content: folder, 
                                contentDigest: createContentDigest(folder)
                            }, 
                            ...result
                        });
                        callback(null);
                    });
                }, function(err, notUsed) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve();
                })}));
};
