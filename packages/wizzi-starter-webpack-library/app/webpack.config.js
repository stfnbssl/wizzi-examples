/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-webpack-library\.wizzi\root\webpack.config.js.ittf
*/
'use strict';
const path = require('path');
const resolve = path.resolve;
const webpack = require('webpack');
module.exports = {
    mode: "development", 
    entry: [
        './src/index.js'
    ], 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/, 
                use: [
                    'babel-loader'
                ]
            }
        ]
    }, 
    resolve: {
        modules: [
            path.resolve(__dirname, "src"), 
            "node_modules"
        ], 
        extensions: [
            ".js", 
            ".json"
        ], 
        alias: {
            
        }, 
        fallback: {
            
        }
    }, 
    output: {
        path: path.resolve(__dirname, '..', 'dist', 'scripts'), 
        filename: 'wizzi-starter-webpack-library.js', 
        library: 'webpackNumbers', 
        libraryTarget: 'var'
    }, 
    node: {
        
    }, 
    plugins: [
        
    ], 
    devtool: 'cheap-module-source-map', 
    externals: [
        {
            'lodash': '_'
        }
    ], 
    devServer: {
        
    }
};
