/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-webpack\.wizzi\root\webpack.config.js.ittf
*/
'use strict';
const path = require('path');
const resolve = path.resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
            }, 
            {
                test: /\.html$/, 
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }, 
            {
                test: /\.css$/, 
                use: [
                    'style-loader', 
                    'css-loader'
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
            
        }
    }, 
    output: {
        path: path.resolve(__dirname, '..', 'app', 'scripts'), 
        filename: 'wizzi-webpack.js'
    }, 
    node: {
        
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', 
            filename: './index.html'
        }), 
        new webpack.HotModuleReplacementPlugin()
    ], 
    devtool: 'cheap-module-source-map', 
    devServer: {
        contentBase: './dist', 
        open: true, 
        hot: true
    }
};
