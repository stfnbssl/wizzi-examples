/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-studio\.wizzi\ittf\server\apis\github.js.ittf
*/
'use strict';
/**
     Api: Github
*/

/**
     Dependencies
*/
var util = require('util');
var path = require('path');
var async = require('async');
var _ = require('lodash');
var wizzi = require('wizzi');
var file = wizzi.file;
var verify = wizzi.verify;
var u = require('../lib/utils');
var globalApi;
var globalConfig;
var assert = require('assert');
var chalk = require('chalk');
var myCrypto = require('../lib/myCrypto');
function hashEncrypt(text) {
    // return myCrypto.encryptSimple(text)
    return myCrypto.encrypt(text);
}
function hashDecrypt(text) {
    // return myCrypto.decryptSimple(text)
    return myCrypto.decrypt(text);
}
var wizziTools = require("wizzi-tools");
var gitapi = require("../lib/gitapi");

function error(message) {
    return {
            __is_error: true, 
            message: message
        };
}

function success(message) {
    return {
            __is_success: true, 
            message: message
        };
}


function makeWizziFactoryCreator(storeKind, plugins, configGlobalContext, configUser, configRoleOrSubscription) {
    configGlobalContext = configGlobalContext || {};
    if (verify.isString(configUser) && verify.isString(configRoleOrSubscription)) {
        return function createWizziFactory(globalContext, callback) {
                globalContext = _.merge(configGlobalContext, globalContext || {});
                wizzi.createFactory(configUser, configRoleOrSubscription, {
                    repo: {
                        storeKind: storeKind
                    }, 
                    plugins: {
                        items: plugins
                    }, 
                    globalContext: globalContext || {}
                }, callback);
            };
    }
    else {
        return function createWizziFactory(user, roleOrSubscription, globalContext, callback) {
                globalContext = _.merge(configGlobalContext, globalContext || {});
                wizzi.createFactory(user, roleOrSubscription, {
                    repo: {
                        storeKind: storeKind
                    }, 
                    plugins: {
                        items: plugins
                    }, 
                    globalContext: globalContext || {}
                }, callback);
            };
    }
}
function makePaths(config) {
    return {
            normalize: function(filepath) {
                return verify.replaceAll(filepath, '\\', '/');
            }, 
            uriFromPath: function(filepath, excludeIttfExtension) {
                filepath = this.normalize(filepath).toLowerCase();
                if (excludeIttfExtension && verify.endsWith(filepath, '.ittf')) {
                    filepath = filepath.substr(0, filepath.length - 5);
                }
                return filepath.substr(config.studioBasePath.length);
            }, 
            pathFromUri: function(uri) {
                return path.join(config.studioBasePath, uri);
            }, 
            joinPathFromArray: function(segments) {
                var ret = segments[0];
                for (var i=1; i<segments.length; i++) {
                    ret = path.join(ret, segments[i]);
                }
                return ret;
            }, 
            fileInfoByPath: function(filePath, baseFolder, baseUri) {
                filePath = this.normalize(filePath);
                baseFolder = this.normalize(baseFolder);
                var basename = path.basename(filePath);
                var dirname = path.dirname(filePath);
                var relFolder = path.dirname(filePath).length > baseFolder.length ? path.dirname(filePath).substr(baseFolder.length + 1) : '';
                var fileUri = filePath.substr(baseFolder.length);
                var ss = basename.split('.');
                if (ss[ss.length-1] === 'ittf') {
                    return {
                            uri: (baseUri || '') + fileUri, 
                            name: ss.slice(0, ss.length-2).join('.'), 
                            basename: basename, 
                            displayName: (relFolder.length > 0 ? relFolder + '/' + basename : basename), 
                            isIttfDocument: true, 
                            isFragment: filePath.indexOf('/t/') > -1, 
                            schema: ss[ss.length-2], 
                            mime: ss[ss.length-2], 
                            relFolder: relFolder, 
                            fullPath: filePath, 
                            hash: hashEncrypt(filePath)
                        };
                }
                else {
                    return {
                            uri: fileUri, 
                            name: ss.slice(0, ss.length-1).join('.'), 
                            basename: basename, 
                            displayName: (relFolder.length > 0 ? relFolder + '/' + basename : basename), 
                            isIttfDocument: false, 
                            schema: null, 
                            mime: ss[ss.length-1], 
                            relFolder: relFolder, 
                            fullPath: filePath, 
                            hash: hashEncrypt(filePath)
                        };
                }
            }, 
            getFolderFiles: function(folderPath, baseFolderPath, baseUri, callback) {
                if (typeof callback === 'undefined') {
                    callback = baseUri;
                    baseUri = '';
                }
                var glob = this.normalize(folderPath) + '/*.*';
                var files = file.getGlobbedFiles(glob);
                console.log('wizzi-studio.apis.gists.getFolderFiles', glob, files);
                var ret = [];
                var i, i_items=files, i_len=files.length, item;
                for (i=0; i<i_len; i++) {
                    item = files[i];
                    ret.push(this.fileInfoByPath(item, baseFolderPath, baseUri));
                }
                return callback(null, {
                        status: success("Got folder files"), 
                        data: {
                            items: ret
                        }
                    });
            }, 
            getIttfFilesOfSchema: function(folderPath, schemaName) {
                var suffix = '.' + schemaName + '.ittf';
                var glob = this.normalize(folderPath) + '/*.' + schemaName + '.ittf';
                var files = file.getGlobbedFiles(glob);
                console.log('getFolderIttfFiles', glob, schemaName, files);
                var ret = [];
                var i, i_items=files, i_len=files.length, item;
                for (i=0; i<i_len; i++) {
                    item = files[i];
                    var dirName = path.dirname(item);
                    var baseName = path.basename(item);
                    var name = baseName.substring(0, baseName.length - suffix.length);
                    ret.push({
                        name: name, 
                        baseName: baseName, 
                        dirName: dirName, 
                        fullPath: this.normalize(path.join(dirName, path.basename(item)))
                    });
                }
                return ret;
            }, 
            fsItemExists: function(filePath, callback) {
                return callback(null, file.exists(filePath));
            }, 
            getFile: function(filePath, callback) {
                file.readFile(filePath, callback);
            }, 
            putFile: function(filePath, content, callback) {
                file.writeFile(filePath, content, callback);
            }, 
            deleteFile: function(filePath, callback) {
                file.deleteFile(filePath, callback);
            }, 
            duplicateFsItem: function(itemPath, newPath, callback) {
                file.duplicate(itemPath, newPath, callback);
            }, 
            renameFsItem: function(oldPath, newPath, callback) {
                file.rename(oldPath, newPath, callback);
            }, 
            clonesFolderPath: function(userId) {
                if (userId) {
                    return path.join(config.githubBasePath, userId, 'clones');
                }
                else {
                    return path.join(config.githubBasePath, 'clones');
                }
            }, 
            cloneFilePath: function(userId, name) {
                return path.join(this.clonesFolderPath(userId), name);
            }, 
            cloneInfoByPath: function(filePath) {
                return this.fileInfoByPath(filePath, this.clonesFolderPath());
            }, 
            getCloneFiles: function(userId, callback) {
                return this.getFolderFiles(this.clonesFolderPath(kind, userId), this.clonesFolderPath(kind), '/wizzi/' + kind + 's', callback);
            }, 
            cloneFileExists: function(userId, name, callback) {
                return this.fsItemExists(this.cloneFilePath(userId, name), callback);
            }, 
            getCloneFile: function(userId, name, callback) {
                return this.getFile(this.cloneFilePath(userId, name), callback);
            }, 
            putCloneFile: function(userId, name, content, callback) {
                var filePath = this.cloneFilePath(userId, name);
                this.putFile(filePath, content, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    var clone = this.cloneInfoByPath(filePath);
                    clone.content = content;
                    return callback(null, {
                            status: success("Clone created"), 
                            data: {
                                clone: clone
                            }
                        });
                });
            }
        };
}
function makeClonesApi(config) {
    var paths = makePaths(config);
    return {
            getClone: function(options, callback) {
                var userId = options.userId;
                var url = options.url;
                var name = options.name;
                gitapi.clone({
                    filepath: paths.clonesFolderPath(userId), 
                    url: url, 
                    name: name
                }).then((ret) => {
                    if (ret == null) {
                        return callback(null, {
                                status: success("repository cloned"), 
                                data: {
                                    name: name
                                }
                            });
                    }
                    else {
                        return callback(error(ret));
                    }
                }).catch((err) => {
                    return callback(error(err));
                })
            }, 
            wizzifyClone: function(options, callback) {
                var userId = options.userId;
                var name = options.name;
                var folder = options.folder;
                var source;
                if (folder) {
                    source = path.join(paths.clonesFolderPath(userId), name, 'origin', folder);
                }
                else {
                    source = path.join(paths.clonesFolderPath(userId), name, 'origin');
                }
                var dest = path.join(paths.clonesFolderPath(userId), name, 'wizzi', 'src');
                console.log('wizzifyClone.source,dest', source, dest);
                wizziTools.importFolder(source, dest, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    console.log('wizzifyClone', result);
                    return callback(null, {
                            status: success("Cloned repository wizzified"), 
                            data: {}
                        });
                });
            }
        };
}


module.exports = function(app, config, api, callback) {
    globalApi = api;
    globalConfig = config;
    var clonesApi = makeClonesApi(config);
    api.github = {
        getClone: clonesApi.getClone, 
        wizzifyClone: clonesApi.wizzifyClone
    };
    return callback(null, api);
};
