/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-studio\.wizzi\ittf\server\middleware\contextLoader.js.ittf
*/
'use strict';
var path = require('path');
var async = require('async');
var stringify = require('json-stringify-safe');
var wizzi = require('wizzi');
var verify = wizzi.verify;
var prettify = require('wizzi-utils').prettifyFromString;
var config = require('../config');
/**
     req.query._context contains a semicolon separated list of
     context models export names.
     For each <export-name> must exists a req.query._<export-name> parameter
     with a type;path value.
     The type is the model knwon type or a wizzi schema, the path is the
     relative path of the ittf document of the model, relative to the
     filepath of the requested resource.
    
     Example
     req.query._context = 'cs;info'
     req.query._cs = 'cheatsheet;html'
     req.query._info = 'json;../cslayout.json.ittf'
    
     If the path value is missing it defaults to ./index.<type>.ittf
    
*/
module.exports = function(resourceFilePath, req, callback) {
    var contextRequest = req.query._context;
    if (verify.isEmpty(contextRequest)) {
        var ss = path.basename(resourceFilePath).split('.');
        console.log('ittf 1', resourceFilePath);
        if (ss[ss.length-1] === 'ittf' && ss[ss.length-2] !== 'json') {
            var seedName = ss.slice(0, -2).join('.');
            console.log('ittf 2', seedName);
            var twinJsonPath = path.join(path.dirname(resourceFilePath), seedName + '.json.ittf');
            console.log('ittf 3', twinJsonPath);
            if (wizzi.file.isFile(twinJsonPath)) {
                return(buildTwinJsonContext('mpage', twinJsonPath, callback));
            }
            else {
                return(callback(null, {}));
            }
        }
        else {
            return(callback(null, {}));
        }
    }
    // var userId = req.user.id
    var ss = contextRequest.split(';');
    var requests = [];
    var i, i_items=ss, i_len=ss.length, s;
    for (i=0; i<i_len; i++) {
        s = ss[i];
        var request = {
            exportName: s
        };
        var type_path = req.query['_' + s];
        console.log('contextLoader exportName, type_path', s, type_path);
        if (verify.isEmpty(type_path)) {
            return(callback({
                requestedResource: resourceFilePath, 
                message: 'Missing query param for requested context model: ' + s
            }));
        }
        var tp = type_path.split(';');
        request.type = tp[0];
        if (tp.length < 2) {
            request.relPath = './index.' + tp[0] + '.ittf';
        }
        else {
            request.relPath = tp[1];
        }
        console.log('contextLoader exportName, type_path, relPath', s, type_path, request.relPath);
        if (request.type === 'cheatsheet') {
            request.name = request.relPath;
            requests.push(request);
        }
        else {
            request.fullPath = path.join(path.dirname(resourceFilePath), request.relPath);
            requests.push(request);
        }
        console.log('contextLoader request', request);
    }
    console.log('contextLoader.requests', requests);
    var resultContext = {};
    async.map(requests, function(request, callback) {
        if (request.type === 'cheatsheet') {
            return loadCheatsheet(request.name, function(err, model) {
                    if (err) {
                        return callback(err);
                    }
                    resultContext[request.exportName] = model;
                    return callback(null);
                });
        }
        else {
            return wizzi.model(request.fullPath, function(err, model) {
                    if (err) {
                        return callback(err);
                    }
                    resultContext[request.exportName] = model;
                    return callback(null);
                });
        }
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        return callback(null, resultContext);
    });
};
function buildTwinJsonContext(exportName, twinJsonPath, callback) {
    wizzi.model(twinJsonPath, function(err, model) {
        if (err) {
            return callback(err);
        }
        console.log('ittf 4', model.wzElement);
        return callback(null, {
                [exportName]: model
            });
    });
}
function loadCheatsheet(name, callback) {
    var csPath = path.join(config.cheatsheetsBasePath, name, 'index.meta.ittf');
    wizzi.mtree(csPath, {}, function(err, mTree) {
        if (err) {
            return callback(err);
        }
        // items are ittf fragments that will be ittf/prettified and generated
        var _all_items = [];
        // the resulting cheatsheet context object that will be returned when built
        var result = {
            elements: [
                
            ]
        };
        var i, i_items=mTree.nodes[0].children, i_len=mTree.nodes[0].children.length, itemTop;
        for (i=0; i<i_len; i++) {
            itemTop = mTree.nodes[0].children[i];
            if (itemTop.n !== 'element') {
                // set properties of result
                result[itemTop.n] = itemTop.v;
            }
        }
        var i, i_items=mTree.nodes[0].children, i_len=mTree.nodes[0].children.length, itemTop;
        for (i=0; i<i_len; i++) {
            itemTop = mTree.nodes[0].children[i];
            // log itemTop.n, itemTop.v
            if (itemTop.n === 'element') {
                var elementResult = {
                    name: itemTop.v, 
                    items: [
                        
                    ]
                };
                var j, j_items=itemTop.children, j_len=itemTop.children.length, itemEl;
                for (j=0; j<j_len; j++) {
                    itemEl = itemTop.children[j];
                    if (itemEl.n === 'item') {
                        // ittf fragment
                        var itemResult = {
                            schema: result.schema, 
                            render: 'artifact'
                        };
                        var k, k_items=itemEl.children, k_len=itemEl.children.length, item;
                        for (k=0; k<k_len; k++) {
                            item = itemEl.children[k];
                            if (item.n === 'ittf') {
                                // log item.n, mTree.toIttf(item.children[0])
                                if (item.children.length == 1) {
                                    if ((result.schema === 'json' && (item.children[0].n === '{' || item.children[0].n === '[')) || item.children[0].n === ittfRootFromSchema(result.schema) || ittfRootFromSchema(result.schema) === 'any') {
                                        // is already ok, has the correct root
                                        itemResult[item.n] = mTree.toIttf(item.children[0]);
                                        itemResult[item.n + 'Wrapped'] = itemResult[item.n];
                                    }
                                    else {
                                        // wrap it
                                        var ittfNode = wrapperForSchema(result.schema);
                                        var l, l_items=item.children, l_len=item.children.length, node;
                                        for (l=0; l<l_len; l++) {
                                            node = item.children[l];
                                            ittfNode.children.push(node);
                                        }
                                        itemResult[item.n] = mTree.toIttf(item.children[0]);
                                        itemResult[item.n + 'Wrapped'] = mTree.toIttf(ittfNode);
                                    }
                                }
                                else {
                                    // wrap them
                                    var ittfNode = wrapperForSchema(result.schema);
                                    var l, l_items=item.children, l_len=item.children.length, node;
                                    for (l=0; l<l_len; l++) {
                                        node = item.children[l];
                                        ittfNode.children.push(node);
                                    }
                                    itemResult[item.n] = mTree.toIttf(item.children[0]);
                                    itemResult[item.n + 'Wrapped'] = mTree.toIttf(ittfNode);
                                }
                            }
                            else if (item.n === 'expected') {
                                itemResult[item.n] = buildExpected(item).trim()
                                ;
                            }
                            else {
                                itemResult[item.n] = item.v;
                                // log item.n, item.v
                            }
                        }
                        elementResult.items.push(itemResult);
                        _all_items.push(itemResult);
                    }
                    else {
                        elementResult[itemEl.n] = itemEl.v;
                    }
                }
                result.elements.push(elementResult);
            }
        }
        var dump = stringify(result, null, 2);
        // log 'result\n', dump
        var dump = stringify(mTree.toIttf(), null, 2);
        // log 'jsCheatSheet\n', dump
        var dump = stringify(mTree, null, 2);
        // log 'jsCheatSheet\n', dump
        async.map(_all_items, function(item, callback) {
            console.log('contextLoader.prettify', stringify(item.ittf, null, 2));
            prettify(item.ittf, function(err, pretty) {
                if (err) {
                    return callback(err);
                }
                item.ittfPretty = pretty;
                if (item.render === 'script') {
                    wizzi.mtreeDebugFromText(item.ittfWrapped, {}, function(err, script) {
                        if (err) {
                            item.generated = verify.htmlEscape(stringify(err, null, 2));
                        }
                        else {
                            item.generated = verify.htmlEscape(script.mTreeBuildUpScript);
                        }
                        item.generated = item.generated ? item.generated.trim() : 'No result. Something went wrong!';
                        callback(null);
                    });
                }
                else {
                    wizzi.genFromText(item.ittfWrapped, {}, {
                        artifactName: artifactNameFromSchema(item.schema), 
                        artifactContext: {
                            noUseStrict: true, 
                            noGeneratorComments: true
                        }
                    }, function(err, artifactText) {
                        if (err) {
                            item.generated = verify.htmlEscape(stringify(err, null, 2));
                        }
                        else {
                            artifactText = verify.htmlEscape(artifactText);
                            item.generated = artifactText ? artifactText.trim() : 'No result. Something went wrong!';
                        }
                        callback(null);
                    });
                }
            });
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            var dump = stringify(result, null, 2);
            // log 'result\n', dump
            callback(null, result);
        });
    });
}
function buildExpected(ittf, sb, indent) {
    if (typeof sb === 'undefined') {
        sb = [];
        var i, i_items=ittf.children, i_len=ittf.children.length, item;
        for (i=0; i<i_len; i++) {
            item = ittf.children[i];
            buildExpected(item, sb, 0);
        }
        return verify.htmlEscape(sb.join(''));
    }
    else {
        sb.push(new Array(indent).join(' '));
        sb.push(ittf.v + '\n');
        var i, i_items=ittf.children, i_len=ittf.children.length, item;
        for (i=0; i<i_len; i++) {
            item = ittf.children[i];
            buildExpected(item, sb, indent + 4);
        }
    }
}
var schemaArtifactMap = {
    js: 'js/module', 
    jsx: 'js/module', 
    ts: 'ts/module', 
    html: 'html/document', 
    css: 'css/document', 
    scss: 'scss/document', 
    svg: 'svg/document', 
    vtt: 'vtt/document', 
    md: 'md/document', 
    json: 'json/document', 
    ittf: 'ittf/document'
};
function artifactNameFromSchema(schema) {
    // log 'artifactNameFromSchema', schema, schemaArtifactMap[schema]
    return schemaArtifactMap[schema];
}
var schemaIttfRootMap = {
    js: 'module', 
    jsx: 'module', 
    ts: 'module', 
    html: 'html', 
    css: 'css', 
    scss: 'scss', 
    svg: 'svg', 
    md: 'vtt', 
    vtt: 'vtt', 
    json: '{', 
    ittf: 'any'
};
function ittfRootFromSchema(schema) {
    // log 'ittfRootFromSchema', schema, schemaIttfRootMap[schema]
    return schemaIttfRootMap[schema];
}
function wrapperForSchema(schema) {
    if (schema === 'js' || schema === 'jsx') {
        return {
                n: 'module', 
                children: [
                    {
                        n: 'kind', 
                        v: 'react', 
                        children: [
                            
                        ]
                    }
                ]
            };
    }
    else if (schema === 'ts') {
        return {
                n: 'module', 
                children: [
                    
                ]
            };
    }
    else {
        return {
                n: schema, 
                children: [
                    
                ]
            };
    }
}
