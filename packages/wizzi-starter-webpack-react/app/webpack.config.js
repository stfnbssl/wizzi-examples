/*
    artifact generator: C:\My\wizzi\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-examples\packages\webpack-react\.wizzi\root\webpack.config.js.ittf
*/
'use strict';
const path = require('path');
const resolve = path.resolve;
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
            }
        ]
    }, 
    resolve: {
        extensions: [
            ".js", 
            ".jsx", 
            ".json"
        ], 
        alias: {
            
        }
    }, 
    output: {
        path: path.resolve(__dirname, '..', 'dist', 'scripts'), 
        filename: 'webpack-react.js'
    }, 
    node: {
        fs: 'empty', 
        module: 'empty', 
        'mongodb': 'empty', 
        'mongodb-core': 'empty'
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', 
            filename: './index.html'
        })
    ], 
    devtool: 'cheap-module-source-map', 
    devServer: {
        contentBase: './dist'
    }
};
