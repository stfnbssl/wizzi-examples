/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-studio\.wizzi\ittf\server\middleware\ittf.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var stringify = require('json-stringify-safe');
var ittfDocumentScanner = require('wizzi-utils').ittfDocumentScanner;
var textDocumentScanner = require('wizzi-utils').textDocumentScanner;
var folderBrowse = require('wizzi-utils').folderBrowse;
var bundlers = require('wizzi-bundlers');
var rollupBundler = bundlers.rollupBundler;
var webpackBundler = bundlers.webpackBundler;
var parcelBundler = bundlers.parcelBundler;
var wizzi = require('wizzi');
var contextLoader = require('./contextLoader');
/**
     *.html.ittf     wizzi/htmlDocument
     ?meta=json
     ?meta=html
     ?meta=old_html
     *.bundle.ittf   wizzi-lab-site/bundle
     *.js.ittf       wizzi/jsModule
     *.json.ittf     wizzi/jsonDocument
     *.css.ittf      wizzi/cssDocument
     *.form.ittf     wizzi-lab-site/formJsonizer
     *.html
     *.js
     *.json
     *.css
     *.png | *.jpg |*.gif |*.bmp |*.tiff
     *.svg
     *.woff | *.ttf
*/
module.exports = function(root, routePath, options) {
    if (!root) {
        throw new TypeError('root path required');
    }
    if (typeof root !== 'string') {
        throw new TypeError('root path must be a string');
    }
    if (!routePath) {
        throw new TypeError('routePath required');
    }
    if (typeof routePath !== 'string') {
        throw new TypeError('routePath must be a string');
    }
    // log 'middleware.ittf.root', root
    return function(req, res, next) {
            if (req.method !== 'GET' && req.method !== 'HEAD') {
                return next();
            }
            var urlPathName = decodeURIComponent(req._parsedUrl.pathname);
            var pathname = urlPathName.substr(routePath.length);
            var filePath = path.join(root, pathname);
            // log 'ittf.pathname, pathname, filePath', urlPathName, pathname, filePath
            if (wizzi.file.exists(filePath) === false) {
                return next();
            }
            if (wizzi.file.isFile(filePath) === false) {
                return sendFolderScan(filePath, root, req.query.meta, res);
            }
            var ext4 = filePath.substr(-4, 4);
            var ext5 = filePath.substr(-5, 5);
            // log 'ext4', ext4
            try {
                if (ext5 == '.ittf' && req.query.meta == 'debug') {
                    createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                        if (err) {
                            return sendError(res, err, {
                                    format: 'json'
                                });
                        }
                        wf.loadMTreeDebugInfo(filePath, {
                            req: req, 
                            __data: {}
                        }, function(err, debugInfo) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            res.setHeader('content-type', 'text/plain');
                            return res.send(debugInfo.mTreeBuildUpScript);
                        });
                    });
                }
                else if (filePath.substr(-10, 10) === '.html.ittf') {
                    if (req.query.meta && req.query.meta === 'json') {
                        ittfDocumentScanner.scan(filePath, {
                            rootFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            return sendJSONStringified(res, documentState);
                        });
                    }
                    else if (req.query.meta && req.query.meta === 'html') {
                        ittfDocumentScanner.scan(filePath, {
                            rootFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                wf.loadModelAndGenerateArtifact(wizzi.config.get('meta-html-ittf-path'), {
                                    modelRequestContext: {
                                        wizzischema: 'html', 
                                        path: filePath, 
                                        req: req, 
                                        ds: documentState
                                    }
                                }, 'html/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                    else {
                        // log 'wizzi-studio/middleware/ittf creating wizzi factory for ' + filePath
                        contextLoader(filePath, req, function(err, modelContext) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            modelContext.req = req;
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                // log 'wizzi-studio/middleware/ittf created wizzi factory for ' + filePath
                                wf.loadModelAndGenerateArtifact(filePath, {
                                    modelRequestContext: modelContext, 
                                    artifactRequestContext: {}
                                }, 'html/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                }
                else if (filePath.substr(-9, 9) === '.css.ittf') {
                    if (req.query.meta && req.query.meta === 'json') {
                        ittfDocumentScanner.scan(filePath, {
                            rootFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            return sendJSONStringified(res, documentState);
                        });
                    }
                    else if (req.query.meta && req.query.meta === 'html') {
                        ittfDocumentScanner.scan(filePath, {
                            rootFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                wf.loadModelAndGenerateArtifact(wizzi.config.get('meta-html-ittf-path'), {
                                    modelRequestContext: {
                                        wizzischema: 'html', 
                                        path: filePath, 
                                        req: req, 
                                        ds: documentState
                                    }
                                }, 'html/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                    else {
                        // log 'wizzi-studio/middleware/ittf creating wizzi factory for ' + filePath
                        contextLoader(filePath, req, function(err, modelContext) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            modelContext.req = req;
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                // log 'wizzi-studio/middleware/ittf created wizzi factory for ' + filePath
                                wf.loadModelAndGenerateArtifact(filePath, {
                                    modelRequestContext: modelContext, 
                                    artifactRequestContext: {}
                                }, 'css/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    res.setHeader('content-type', 'text/css');
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                }
                else if (filePath.substr(-9, 9) === '.scss.ittf') {
                    if (req.query.meta && req.query.meta === 'json') {
                        ittfDocumentScanner.scan(filePath, {
                            rootFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            return sendJSONStringified(res, documentState);
                        });
                    }
                    else if (req.query.meta && req.query.meta === 'html') {
                        ittfDocumentScanner.scan(filePath, {
                            rootFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                wf.loadModelAndGenerateArtifact(wizzi.config.get('meta-html-ittf-path'), {
                                    modelRequestContext: {
                                        wizzischema: 'html', 
                                        path: filePath, 
                                        req: req, 
                                        ds: documentState
                                    }
                                }, 'html/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                    else {
                        // log 'wizzi-studio/middleware/ittf creating wizzi factory for ' + filePath
                        contextLoader(filePath, req, function(err, modelContext) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            modelContext.req = req;
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                // log 'wizzi-studio/middleware/ittf created wizzi factory for ' + filePath
                                wf.loadModelAndGenerateArtifact(filePath, {
                                    modelRequestContext: modelContext, 
                                    artifactRequestContext: {}
                                }, 'scss/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    res.setHeader('content-type', 'text/scss');
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                }
                else if (filePath.substr(-10, 10) === '.json.ittf') {
                    if (req.query.meta && req.query.meta === 'json') {
                        ittfDocumentScanner.scan(filePath, {
                            rootFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            return sendJSONStringified(res, documentState);
                        });
                    }
                    else if (req.query.meta && req.query.meta === 'html') {
                        ittfDocumentScanner.scan(filePath, {
                            rootFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                wf.loadModelAndGenerateArtifact(wizzi.config.get('meta-html-ittf-path'), {
                                    modelRequestContext: {
                                        wizzischema: 'html', 
                                        path: filePath, 
                                        req: req, 
                                        ds: documentState
                                    }
                                }, 'html/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                    else {
                        // log 'wizzi-studio/middleware/ittf creating wizzi factory for ' + filePath
                        contextLoader(filePath, req, function(err, modelContext) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            modelContext.req = req;
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                // log 'wizzi-studio/middleware/ittf created wizzi factory for ' + filePath
                                wf.loadModelAndGenerateArtifact(filePath, {
                                    modelRequestContext: modelContext, 
                                    artifactRequestContext: {}
                                }, 'json/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    res.setHeader('content-type', 'application/json');
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                }
                else if (filePath.substr(-9, 9) === '.svg.ittf') {
                    if (req.query.meta && req.query.meta === 'json') {
                        ittfDocumentScanner.scan(filePath, {
                            rootFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            return sendJSONStringified(res, documentState);
                        });
                    }
                    else if (req.query.meta && req.query.meta === 'html') {
                        ittfDocumentScanner.scan(filePath, {
                            rootFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                wf.loadModelAndGenerateArtifact(wizzi.config.get('meta-html-ittf-path'), {
                                    modelRequestContext: {
                                        wizzischema: 'html', 
                                        path: filePath, 
                                        req: req, 
                                        ds: documentState
                                    }
                                }, 'html/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                    else {
                        // log 'wizzi-studio/middleware/ittf creating wizzi factory for ' + filePath
                        contextLoader(filePath, req, function(err, modelContext) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            modelContext.req = req;
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                // log 'wizzi-studio/middleware/ittf created wizzi factory for ' + filePath
                                wf.loadModelAndGenerateArtifact(filePath, {
                                    modelRequestContext: modelContext, 
                                    artifactRequestContext: {}
                                }, 'svg/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    res.setHeader('content-type', 'image/svg+xml');
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                }
                else if (filePath.substr(-9, 9) === '.vtt.ittf') {
                    if (req.query.meta && req.query.meta === 'json') {
                        ittfDocumentScanner.scan(filePath, {
                            rootFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            return sendJSONStringified(res, documentState);
                        });
                    }
                    else if (req.query.meta && req.query.meta === 'html') {
                        ittfDocumentScanner.scan(filePath, {
                            rootFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                wf.loadModelAndGenerateArtifact(wizzi.config.get('meta-html-ittf-path'), {
                                    modelRequestContext: {
                                        wizzischema: 'html', 
                                        path: filePath, 
                                        req: req, 
                                        ds: documentState
                                    }
                                }, 'html/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                    else {
                        // log 'wizzi-studio/middleware/ittf creating wizzi factory for ' + filePath
                        contextLoader(filePath, req, function(err, modelContext) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            modelContext.req = req;
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                // log 'wizzi-studio/middleware/ittf created wizzi factory for ' + filePath
                                wf.loadModelAndGenerateArtifact(filePath, {
                                    modelRequestContext: modelContext, 
                                    artifactRequestContext: {}
                                }, 'vtt/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    res.setHeader('content-type', 'text/vtt');
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                }
                else if (filePath.substr(-10, 10) === '.site.ittf') {
                    if (req.query.meta && req.query.meta === 'json') {
                        textDocumentScanner.scan(filePath, {
                            baseFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            return sendJSONStringified(res, documentState);
                        });
                    }
                    else if (req.query.meta && req.query.meta === 'html') {
                        textDocumentScanner.scan(filePath, {
                            baseFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                wf.loadModelAndGenerateArtifact(wizzi.config.get('meta-html-ittf-path'), {
                                    modelRequestContext: {
                                        path: filePath, 
                                        ds: documentState
                                    }
                                }, 'html/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                    else {
                        var content = wizzi.file.read(filePath);
                        res.setHeader('content-type', 'text/plain');
                        res.end(content);
                    }
                }
                else if (filePath.substr(-15, 15) === '.rollup.js.ittf') {
                    rollupBundler.makeBundle(filePath, {}, function(err, rendered) {
                        if (err) {
                            return sendError(res, err, {
                                    format: 'json'
                                });
                        }
                        res.setHeader('content-type', 'text/javascript');
                        return res.send(rendered);
                    });
                }
                else if (filePath.substr(-16, 16) === '.webpack.js.ittf') {
                    var basename = path.basename(filePath);
                    var oFileName = basename.substr(0, basename.length - 16) + '.js';
                    console.log('middleware.ittf.webpack.js.ittf.oFile', oFileName);
                    webpackBundler.makeBundle(filePath, {
                        outputPath: path.dirname(filePath), 
                        outputFileName: oFileName
                    }, function(err, rendered) {
                        if (err) {
                            return sendError(res, err, {
                                    format: 'json'
                                });
                        }
                        var content = wizzi.file.read(path.join(path.dirname(filePath), oFileName));
                        res.setHeader('content-type', 'text/javascript');
                        return res.send(content);
                    });
                }
                else if (filePath.substr(-15, 15) === '.parcel.js.ittf') {
                    var basename = path.basename(filePath);
                    var oFileName = basename.substr(0, basename.length - 15) + '.js';
                    console.log('middleware.ittf.parcel.js.ittf.oFile', oFileName);
                    parcelBundler.makeBundle(filePath, {
                        outputPath: path.dirname(filePath), 
                        outputFileName: oFileName
                    }, function(err, rendered) {
                        if (err) {
                            return sendError(res, err, {
                                    format: 'json'
                                });
                        }
                        var content = wizzi.file.read(path.join(path.dirname(filePath), oFileName));
                        res.setHeader('content-type', 'text/javascript');
                        return res.send(content);
                    });
                }
                // this MUST BE AFTER *.(rollup|webpack|parcel).js.ittf
                else if (filePath.substr(-8, 8) === '.js.ittf') {
                    if (req.query.meta && req.query.meta === 'json') {
                        ittfDocumentScanner.scan(filePath, {
                            rootFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            return sendJSONStringified(res, documentState);
                        });
                    }
                    else if (req.query.meta && req.query.meta === 'html') {
                        ittfDocumentScanner.scan(filePath, {
                            rootFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                wf.loadModelAndGenerateArtifact(wizzi.config.get('meta-html-ittf-path'), {
                                    modelRequestContext: {
                                        wizzischema: 'html', 
                                        path: filePath, 
                                        req: req, 
                                        ds: documentState
                                    }
                                }, 'html/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                    else {
                        // log 'wizzi-studio/middleware/ittf creating wizzi factory for ' + filePath
                        contextLoader(filePath, req, function(err, modelContext) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            modelContext.req = req;
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                // log 'wizzi-studio/middleware/ittf created wizzi factory for ' + filePath
                                wf.loadModelAndGenerateArtifact(filePath, {
                                    modelRequestContext: modelContext, 
                                    artifactRequestContext: {}
                                }, 'js/module', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    res.setHeader('content-type', 'text/javascript');
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                }
                else if (filePath.substr(-10, 10) === '.form.ittf') {
                    createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                        if (err) {
                            return sendError(res, err, {
                                    format: 'json'
                                });
                        }
                        wf.loadModelAndGenerateArtifact(filePath, {
                            req: req, 
                            __data: {}
                        }, 'form/jsonizer', function(err, jsonized) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            res.setHeader('content-type', 'application/json');
                            return res.json(jsonized);
                        });
                    });
                }
                else if (filePath.substr(-5, 5) == '.html') {
                    var content = wizzi.file.read(filePath);
                    res.end(content);
                }
                else if (filePath.substr(-3, 3) == '.js') {
                    var content = wizzi.file.read(filePath);
                    res.setHeader('content-type', 'text/javascript');
                    res.end(content);
                }
                else if (filePath.substr(-5, 5) == '.json') {
                    var content = wizzi.file.read(filePath);
                    res.setHeader('content-type', 'application/json');
                    res.end(content);
                }
                else if (filePath.substr(-4, 4) == '.css') {
                    var content = wizzi.file.read(filePath);
                    res.setHeader('content-type', 'text/css');
                    res.end(content);
                }
                else if (filePath.substr(-4, 4) == '.svg') {
                    var content = wizzi.file.read(filePath);
                    res.setHeader('content-type', 'image/svg+xml');
                    res.end(content);
                }
                else if (['.png', '.jpg', '.gif', '.bmp'].indexOf(ext4) > -1 || ['.jpeg', '.tiff'].indexOf(ext5) > -1) {
                    var contentType;
                    if (['.png', '.jpg', '.gif', '.bmp'].indexOf(ext4) > -1) {
                        contentType = 'image/' + ext4.substr(1);
                    }
                    else {
                        contentType = 'image/' + ext5.substr(1);
                    }
                    fs.readFile(filePath, function(err, data) {
                        if (err) {
                            return sendError(res, err, {
                                    format: 'json'
                                });
                        }
                        res.setHeader('content-type', contentType);
                        res.setHeader('content-length', data.length);
                        res.end(data);
                    });
                }
                else if (filePath.substr(-5, 5) == '.woff' || filePath.substr(-4, 4) == '.ttf') {
                    var ctype;
                    if (filePath.substr(-5, 5) == '.woff') {
                        ctype = 'application/x-font-woff';
                    }
                    if (filePath.substr(-4, 4) == '.ttf') {
                        ctype = 'application/x-font-ttf';
                    }
                    wizzi.file.readFile(filePath, function(err, data) {
                        if (err) {
                            return sendError(res, err, {
                                    format: 'json'
                                });
                        }
                        res.setHeader('content-type', ctype);
                        res.setHeader('content-length', data.length);
                        res.end(data);
                    });
                }
                else if (['.mp4', '.vob', '.mpg'].indexOf(ext4) > -1) {
                    var contentType;
                    if (['.mp4'].indexOf(ext4) > -1) {
                        contentType = 'video/' + ext4.substr(1);
                    }
                    else {
                        contentType = 'video/' + ext5.substr(1);
                    }
                    fs.readFile(filePath, function(err, data) {
                        if (err) {
                            return sendError(res, err, {
                                    format: 'json'
                                });
                        }
                        res.setHeader('content-type', contentType);
                        res.setHeader('content-length', data.length);
                        res.end(data);
                    });
                }
                else if (filePath.substr(-5, 5) == '.yaml') {
                    if (req.query.meta && req.query.meta === 'json') {
                        textDocumentScanner.scan(filePath, {
                            baseFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            return sendJSONStringified(res, documentState);
                        });
                    }
                    else if (req.query.meta && req.query.meta === 'html') {
                        textDocumentScanner.scan(filePath, {
                            baseFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                wf.loadModelAndGenerateArtifact(wizzi.config.get('meta-html-ittf-path'), {
                                    modelRequestContext: {
                                        path: filePath, 
                                        ds: documentState
                                    }
                                }, 'html/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                    else {
                        var content = wizzi.file.read(filePath);
                        res.setHeader('content-type', 'text/yaml');
                        res.end(content);
                    }
                }
                else if (filePath.substr(-4, 4) == '.yml') {
                    if (req.query.meta && req.query.meta === 'json') {
                        textDocumentScanner.scan(filePath, {
                            baseFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            return sendJSONStringified(res, documentState);
                        });
                    }
                    else if (req.query.meta && req.query.meta === 'html') {
                        textDocumentScanner.scan(filePath, {
                            baseFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                wf.loadModelAndGenerateArtifact(wizzi.config.get('meta-html-ittf-path'), {
                                    modelRequestContext: {
                                        path: filePath, 
                                        ds: documentState
                                    }
                                }, 'html/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                    else {
                        var content = wizzi.file.read(filePath);
                        res.setHeader('content-type', 'text/yaml');
                        res.end(content);
                    }
                }
                else if (filePath.substr(-4, 4) == '.vtt') {
                    if (req.query.meta && req.query.meta === 'json') {
                        textDocumentScanner.scan(filePath, {
                            baseFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            return sendJSONStringified(res, documentState);
                        });
                    }
                    else if (req.query.meta && req.query.meta === 'html') {
                        textDocumentScanner.scan(filePath, {
                            baseFolder: path.dirname(root)
                        }, function(err, documentState) {
                            if (err) {
                                return sendError(res, err, {
                                        format: 'json'
                                    });
                            }
                            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                                if (err) {
                                    return sendError(res, err, {
                                            format: 'json'
                                        });
                                }
                                wf.loadModelAndGenerateArtifact(wizzi.config.get('meta-html-ittf-path'), {
                                    modelRequestContext: {
                                        path: filePath, 
                                        ds: documentState
                                    }
                                }, 'html/document', function(err, rendered) {
                                    if (err) {
                                        return sendError(res, err, {
                                                format: 'json'
                                            });
                                    }
                                    return res.send(rendered);
                                });
                            });
                        });
                    }
                    else {
                        var content = wizzi.file.read(filePath);
                        res.setHeader('content-type', 'text/vtt');
                        res.end(content);
                    }
                }
                else {
                    return next();
                }
            } 
            catch (ex) {
                return sendError(res, {
                        message: ex.toString(), 
                        trace: ex.stack
                    }, {
                        format: 'json'
                    });
            } 
        };
};
function sendFolderScan(folderPath, root, meta, res) {
    folderBrowse.scan(folderPath, {
        rootFolder: path.dirname(root)
    }, function(err, folderState) {
        if (err) {
            return sendError(res, err, {
                    format: 'json'
                });
        }
        if (meta === 'json') {
            return sendJSONStringified(res, folderState);
        }
        else {
            createWizziFactory('stefi', 'admin', {}, function(err, wf) {
                if (err) {
                    return sendError(res, err, {
                            format: 'json'
                        });
                }
                wf.loadModelAndGenerateArtifact(wizzi.config.get('meta-folder-ittf-path'), {
                    modelRequestContext: {
                        fs: folderState
                    }
                }, 'html/document', function(err, rendered) {
                    if (err) {
                        return sendError(res, err, {
                                format: 'json'
                            });
                    }
                    return res.send(rendered);
                });
            });
        }
    });
}
function createWizziFactory(user, roleOrSubscription, globalContext, callback) {
    globalContext = globalContext || {};
    globalContext.isWizziStudio = true;
    wizzi.createFactory(user, roleOrSubscription, {
        repo: {
            storeKind: 'filesystem'
        }, 
        plugins: {
            items: [
                'wizzi-core', 
                'wizzi-web', 
                'wizzi-js'
            ]
        }, 
        globalContext: globalContext, 
        test: {
            dumps: {
                dumpsBaseFolder: path.join(__dirname, 'mTreeBuildUpDumps'), 
                mTreeBuildupJsWizziScript: {
                    dump: true
                }
            }
        }
    }, callback);
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
            var i, i_items=obj, i_len=obj.length, item;
            for (i=0; i<i_len; i++) {
                item = obj[i];
                cleanCircular(item, stock);
            }
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
        for (var k in obj) {
            var item = obj[k];
            if (!item) {
                delete obj[k]
            }
            else if (typeof item === 'object' && item.length && item.length == 0) {
                delete obj[k]
            }
            else {
                cleanCircular(item, stock);
            }
        }
    }
    return obj;
}
function sendError(res, err, options) {
    // log 'sendError', err, Object.keys(err), err.toString()
    options = options || {};
    var code = options.code || 999;
    var errEmit = err;
    delete errEmit.__is_error
    if (errEmit.stack && errEmit.stack.split) {
        var stackArray = [];
        var i, i_items=errEmit.stack.split('\n'), i_len=errEmit.stack.split('\n').length, line;
        for (i=0; i<i_len; i++) {
            line = errEmit.stack.split('\n')[i];
            stackArray.push('    ' + line);
        }
        errEmit.stack = stackArray;
    }
    if (options.format === 'string') {
        if (typeof err !== 'string') {
            err = util.inspect(err, { depth: null });
        }
        errEmit = wizzi.verify.replaceAll(err, '\n', '<br>');
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(stringify({
        code: code, 
        error: errEmit
    }, null, 4));
}
