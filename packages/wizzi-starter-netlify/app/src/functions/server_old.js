/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-netlify\.wizzi\src\functions\server_old.js.ittf
*/
'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
router.get('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.write('<h1>Hello from Express.js!</h1><div><a href="/.netlify/functions/server/another">Another</a></div>');
    res.end();
})
router.get('/another', (req, res) =>
    res.json({
        route: req.originalUrl
    }))
router.post('/', (req, res) =>
    res.json({
        postBody: req.body
    }))
app.use(bodyParser.json())
app.use('/.netlify/functions/server', router);
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
})
// path must route to lambda
app.use('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../index.html')))
module.exports = app;
module.exports.handler = serverless(app);
