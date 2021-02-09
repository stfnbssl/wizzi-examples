/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\root\webpack.base.config.js.ittf
*/
'use strict';
//
const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const APP_DIR = path.resolve(__dirname, './src');
module.exports = (env) => {
    const {
        PLATFORM, 
        VERSION
    } = env;
    return merge([
            {
                entry: [
                    '@babel/polyfill', 
                    APP_DIR
                ], 
                module: {
                    rules: [
                        {
                            test: /\.js$/, 
                            exclude: /node_modules/, 
                            use: {
                                loader: "babel-loader"
                            }
                        }, 
                        {
                            test: /\.(scss|css)$/, 
                            use: [
                                PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 
                                'css-loader', 
                                'sass-loader', 
                                /**
                                    options: {
                                        modules: true, 
                                        importLoaders: 1, 
                                        localIdentName: "[name]_[local]_[hash:base64]", 
                                        sourceMap: true, 
                                        minimize: true
                                    }*/
                                
                            ]
                        }
                    ]
                }, 
                plugins: [
                    new HtmlWebpackPlugin({
                        template: "./src/index.html", 
                        filename: "./index.html"
                    }), 
                    new webpack.DefinePlugin({
                        'process.env.VERSION': JSON.stringify(env.VERSION), 
                        'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
                    }), 
                    new CopyWebpackPlugin([
                        {
                            from: 'src/static'
                        }
                    ])
                ]
            }
        ]);
};
