/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\plugins\gatsby-source-wizzi\cheatsheets.js.ittf
*/
'use strict';
var path = require('path');
var async = require('async');
var stringify = require('json-stringify-safe');
var wizzi = require('wizzi');
var verify = wizzi.verify;
var prettify = require('wizzi-utils').prettifyFromString;
var highlightCode = require('./highlightCode');
function itemSlug(title) {
    return verify.replaceAll(title, ' ', '-');
}
exports.loadCheatsheet = function(csPath, callback) {
    wizzi.mtree(csPath, {}, function(err, mTree) {
        if (err) {
            return callback(err);
        }
        // items are ittf fragments that will be ittf/prettified and generated
        var _all_items = [];
        // the resulting cheatsheet object that will be returned when built
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
                                if (item.n === 'title') {
                                    itemResult['itemSlug'] = itemSlug(item.v);
                                }
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
            if (!item.ittf) {
                return callback(new Error("Missing ittf node on " + csPath + ", row " + stringify(item, null, 2)));
            }
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
                            item.generated = artifactText;
                            item.generatedEscaped = verify.htmlEscape(artifactText);
                            item.generatedHighlighted = highlightCode(schemaPrismLanguageMap[item.schema], artifactText);
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
};
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
function wrapperForSchema(schema) {
    if (schema === 'js') {
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
var schemaArtifactMap = {
    css: 'css/document', 
    graphql: 'graphql/document', 
    html: 'html/document', 
    ittf: 'ittf/document', 
    js: 'js/module', 
    json: 'json/document', 
    md: 'md/document', 
    scss: 'scss/document', 
    svg: 'svg/document', 
    ts: 'ts/module', 
    vtt: 'vtt/document'
};
function artifactNameFromSchema(schema) {
    // log 'artifactNameFromSchema', schema, schemaArtifactMap[schema]
    return schemaArtifactMap[schema];
}
var schemaIttfRootMap = {
    css: 'css', 
    graphql: 'graphql', 
    ittf: 'any', 
    html: 'html', 
    js: 'module', 
    json: '{', 
    md: 'vtt', 
    scss: 'scss', 
    svg: 'svg', 
    ts: 'module', 
    vtt: 'vtt'
};
function ittfRootFromSchema(schema) {
    // log 'ittfRootFromSchema', schema, schemaIttfRootMap[schema]
    return schemaIttfRootMap[schema];
}
var schemaPrismLanguageMap = {
    css: 'css', 
    graphql: 'graphql', 
    ittf: 'any', 
    html: 'html', 
    js: 'javascript', 
    json: 'json', 
    md: 'vtt', 
    scss: 'scss', 
    svg: 'svg', 
    ts: 'typescript', 
    vtt: 'vtt'
};
