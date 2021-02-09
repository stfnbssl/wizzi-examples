/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\middleware\ittf.js.ittf
*/
'use strict';
import stringify from 'json-stringify-safe';
import util from 'util';
import path from 'path';
import fs from 'fs';
import parseUrl from 'parseurl';
import {Application, RequestHandler, Request, Response} from 'express';
import {config} from '../features/config';
import {wizziProds} from '../features/wizzi';
import {WizziModel} from 'wizzi';
export const IttfDocumentsMiddleware = (app) => {
    console.log('IttfDocumentsMiddleware. Folder served from ', path.resolve(__dirname, '..', '..', '..', 'ittf'));
    app.use('/ittf', ittfMiddleware(path.resolve(__dirname, '..', '..', '..', 'ittf'), '/ittf'));
};
const extContentTypeMap = {
    '.css': 'text/css', 
    '.gif': 'image/gif', 
    '.html': 'text/html', 
    '.jpeg': 'image/jpeg', 
    '.jpg': 'image/jpg', 
    '.js': 'text/javascript', 
    '.json': 'application/json', 
    '.png': 'image/png', 
    '.scss': 'text/scss', 
    '.svg': 'image/svg+xml', 
    '.ttf': 'application/x-font-ttf', 
    '.txt': 'text/plain', 
    '.vtt': 'text/vtt', 
    '.woff': 'application/x-font-woff', 
    '.yaml': 'text/yanl', 
    '.yml': 'text/yanl', 
    '.xml': 'text/xml'
};
function contentTypeFor(file) {
    const nameParts = path.basename(file).split('.');
    if (nameParts[nameParts.length - 1] === 'ittf') {
        return extContentTypeMap['.' + nameParts[nameParts.length - 2]];
    }
    return undefined;
}
function ittfMiddleware(basePath, routePath) {
    return async (req, res, next) => {
            if (req.method !== 'GET' && req.method !== 'HEAD') {
                return next();
            }
            const parsedUrl = parseUrl(req);
            if (!parsedUrl || !parsedUrl.pathname) {
                return next();
            }
            const urlPathName = decodeURIComponent(parsedUrl.pathname);
            const pathname = urlPathName;
            const filePath = path.join(basePath, pathname);
            const extname = path.extname(filePath);
            console.log('ittf.pathname, pathname, filePath', urlPathName, pathname, filePath, path.extname(filePath));
            if (fs.existsSync(filePath) === false) {
                console.log('filePath do not exists', filePath);
                return next();
            }
            console.log('fs.statSync(filePath).isDirectory()', fs.statSync(filePath).isDirectory());
            if (fs.statSync(filePath).isDirectory()) {
                return sendFolderScan(filePath, basePath, req.query.meta, res);
            }
            let contentType = contentTypeFor(filePath);
            console.log('contentType', contentType);
            if (contentType) {
                if (req.query.meta && req.query.meta === 'html') {
                    try {
                        const documentState = await wizziProds.scanIttfDocumentFs(filePath, path.dirname(basePath));
                        const generated = await wizziProds.generateArtifactFs(config.MetaHtmlIttfPath, {
                                wizzischema: 'html', 
                                path: filePath, 
                                req, 
                                ds: documentState
                            });
                        // console.log('generated.meta.document', generated.artifactContent);
                        res.writeHead(200, {
                            'Content-Type': 'text/html', 
                            'Content-Length': generated.artifactContent.length
                        })
                        res.end(generated.artifactContent);
                    } 
                    catch (ex) {
                        sendError(res, ex, {
                            format: 'json'
                        })
                    } 
                }
                return contextLoader(filePath, req, function(err, modelContext) {
                        if (err) {
                            sendError(res, err, {
                                format: 'json'
                            })
                        }
                        wizziProds.generateArtifactFs(filePath, modelContext).then((generated) => {
                            console.log('generated.artifactContent', generated.artifactContent);
                            res.writeHead(200, {
                                'Content-Type': contentType, 
                                'Content-Length': generated.artifactContent.length
                            })
                            res.end(generated.artifactContent);
                        }).catch((err) =>
                            sendError(res, err, {
                                format: 'json'
                            }))
                    });
            }
            next();
            //
        };
}
//
async function contextLoader(resourceFilePath, req, callback) {
    const contextRequest = req.query._context;
    if (contextRequest && contextRequest.length > 0) {
        const ss = contextRequest.split(';');
        const requests = [];
        ss.forEach((element) => {
            const request = {
                exportName: element, 
                fullPath: undefined, 
                relPath: undefined
            };
            const type_path = req.query['_' + element];
            console.log('contextLoader exportName, type_path', element, type_path);
            if (!type_path) {
                return (callback({
                        requestedResource: resourceFilePath, 
                        message: 'Missing query param for requested context model: ' + element
                    }));
            }
            const tp = type_path.split(';');
            request.type = tp[0];
            if (tp.length < 2) {
                request.relPath = './index.' + tp[0] + '.ittf';
            }
            else {
                request.relPath = tp[1];
            }
            console.log('contextLoader exportName, type_path, relPath', element, type_path, request.relPath);
            if (request.type === 'cheatsheet') {
                request.name = request.relPath;
                requests.push(request);
            }
            else {
                request.fullPath = path.join(path.dirname(resourceFilePath), request.relPath);
                requests.push(request);
            }
            console.log('contextLoader request', request);
        })
        console.log('contextLoader.requests', requests);
        const resultContext = {};
        const repeatCount = requests.length;
        const repeat = (index) => {
            if (index == repeatCount) {
                return callback(null, resultContext);
            }
            const request = requests[index];
            if (request.type === 'cheatsheet') {
                return callback('Context loader for cheatsheet type not implemented.');
                //
            }
            else {
                wizziProds.loadModelFs(request.fullPath, {}).then((model) => {
                    resultContext[request.exportName] = model;
                    repeat(index + 1);
                }).catch((err) =>
                    callback(err))
            }
        };
        repeat(0);
    }
    else {
        try {
            const twinJsonContext = await wizziProds.inferAndLoadContextFs(resourceFilePath, 'mpage');
            return (callback(null, twinJsonContext));
        } 
        catch (ex) {
            return callback(ex);
        } 
    }
}
async function sendFolderScan(folderPath, root, meta, res) {
    try {
        const folderState = await wizziProds.scanIttfFolderFs(folderPath, path.dirname(root));
        if (meta === 'json') {
            return sendJSONStringified(res, folderState);
        }
        else {
            const generated = await wizziProds.generateArtifactFs(config.MetaFolderIttfPath, {
                    wizzischema: 'html', 
                    path: folderPath, 
                    fs: folderState
                });
            // console.log('generated.meta.document', generated.artifactContent);
            res.writeHead(200, {
                'Content-Type': 'text/html', 
                'Content-Length': generated.artifactContent.length
            })
            res.end(generated.artifactContent);
        }
    } 
    catch (ex) {
        sendError(res, ex, {
            format: 'json'
        })
    } 
}
function sendJSONStringified(res, wizziModelInstance) {
    res.send('<pre>' + stringify(cleanCircular(wizziModelInstance, []), null, 2) + '</pre>');
}
function cleanCircular(obj, stock) {
    if (!obj) {
        return ;
    }
    if (stock.indexOf(obj) >= 0) {
        return ;
    }
    else {
        stock.push(obj);
    }
    if (typeof obj === 'object') {
        if (obj.length) {
            obj.forEach((element) =>
                cleanCircular(element, stock))
            return ;
        }
        if (obj.parent) {
            delete obj.parent
        }
        if (obj.wzParent) {
            delete obj.wzParent
        }
        if (obj.nodes) {
            delete obj.nodes
        }
        if (obj.evalContext) {
            delete obj.evalContext
        }
        if (obj.loadContext && obj.sourceKey) {
            delete obj.loadContext
        }
        for (k in obj) {
            var item = obj[k];
            if (!item) {
                delete obj[k]
            }
            else {
                if (typeof item === 'object' && item.length && item.length == 0) {
                    delete obj[k]
                }
                else {
                    cleanCircular(item, stock);
                }
            }
        }
    }
    return obj;
}
function sendError(res, err, options) {
    options = options || {};
    const code = options.code || 999;
    let errEmit = err;
    delete errEmit.__is_error
    if (options.format === 'string') {
        if (typeof err !== 'string') {
            err = util.inspect(err, {
                depth: null
            });
        }
        errEmit = err.replace(new RegExp('\n', 'g'), '<br>');
    }
    else {
        if (err.stack && err.stack.split) {
            const stackArray = [];
            err.stack.split('\n').forEach((element) =>
                stackArray.push('    ' + element))
            errEmit.stack = stackArray;
        }
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(stringify({
        code, 
        error: errEmit
    }, null, 4))
}
