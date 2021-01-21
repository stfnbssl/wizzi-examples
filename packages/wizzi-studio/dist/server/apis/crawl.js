/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-studio\.wizzi\ittf\server\apis\crawl.js.ittf
*/
'use strict';
/**
     Api: Crawl
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
var fs = require('fs');
var temp = require('temp');
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


function filefy(textOrPath, callback) {
    if (file.isFile(textOrPath)) {
        return callback(null, textOrPath);
    }
    temp.track();
    temp.open('ittfSource', function(err, info) {
        if (err) {
            return callback(err);
        }
        fs.write(info.fd, textOrPath);
        fs.close(info.fd, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            return callback(null, info.path);
        });
    });
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
            snippetsFolderPath: function(userId) {
                if (userId) {
                    return path.join(config.crawlBasePath, userId, 'snippets');
                }
                else {
                    return path.join(config.crawlBasePath, 'snippets');
                }
            }, 
            snippetFilePath: function(userId, name) {
                return path.join(this.snippetsFolderPath(userId), name);
            }, 
            snippetInfoByPath: function(filePath) {
                return this.fileInfoByPath(filePath, this.snippetsFolderPath());
            }, 
            getSnippetFiles: function(userId, callback) {
                return this.getFolderFiles(this.snippetsFolderPath(kind, userId), this.snippetsFolderPath(kind), '/wizzi/' + kind + 's', callback);
            }, 
            snippetFileExists: function(userId, name, callback) {
                return this.fsItemExists(this.snippetFilePath(userId, name), callback);
            }, 
            getSnippetFile: function(userId, name, callback) {
                return this.getFile(this.snippetFilePath(userId, name), callback);
            }, 
            putSnippetFile: function(userId, name, content, callback) {
                var filePath = this.snippetFilePath(userId, name);
                this.putFile(filePath, content, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    var snippet = this.snippetInfoByPath(filePath);
                    snippet.content = content;
                    return callback(null, {
                            status: success("Snippet created"), 
                            data: {
                                snippet: snippet
                            }
                        });
                });
            }
        };
}
function makeSnippetsApi(config) {
    var paths = makePaths(config);
    return {
            putSnippet: function(options, callback) {
                var userId = options.userId;
                var name = options.name;
                var code = options.code;
                var tags = (options.tags || '').split(' ');
                if (options.mime && name.endsWith('.' + options.mime) == false) {
                    name += '.' + options.mime;
                }
                paths.putSnippetFile(userId, name, code, function(err, putResult) {
                    if (err) {
                        return callback(error(err));
                    }
                    if (options.ittf && options.mime) {
                        paths.putSnippetFile(userId, name + '..ttf', options.ittf, function(err, putResult) {
                            if (err) {
                                return callback(error(err));
                            }
                            return callback(null, {
                                    status: success("snippet and ittf created"), 
                                    data: {}
                                });
                        });
                    }
                    else {
                        return callback(null, {
                                status: success("snippet created"), 
                                data: {}
                            });
                    }
                });
            }, 
            wizzifySnippet: function(options, callback) {
                var code = options.code;
                var mime = options.mime;
                console.log('wizzifySnippet.code', code);
                var validMimes = [
                    'js', 
                    'html', 
                    'css', 
                    'scss', 
                    'json', 
                    'xml', 
                    'graphql', 
                    'svg'
                ];
                if (validMimes.indexOf(mime) < 0) {
                    return callback(error('Cannot wizzyfy the mime type ' + mime));
                }
                wizziTools.wizzify(mime, code, function(err, wizzifiedSnippet) {
                    if (err) {
                        return callback(error(err));
                    }
                    console.log('wizzifySnippet.wizzifiedSnippet', wizzifiedSnippet);
                    return callback(null, {
                            status: success("Code snippet wizzified"), 
                            data: {
                                ittf: wizzifiedSnippet
                            }
                        });
                });
            }
        };
}


module.exports = function(app, config, api, callback) {
    globalApi = api;
    globalConfig = config;
    var snippetsApi = makeSnippetsApi(config);
    api.crawl = {
        putSnippet: snippetsApi.putSnippet, 
        wizzifySnippet: snippetsApi.wizzifySnippet
    };
    return callback(null, api);
};
