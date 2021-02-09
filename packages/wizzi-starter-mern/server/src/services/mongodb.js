/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\services\mongodb.js.ittf
*/
'use strict';
const mongoose = require('mongoose');
module.exports = function start(config, modelBuilders) {
    const { mongoUser, mongoPassword, mongoPath } = config;
    const connectUrl = `mongodb+srv://${mongoUser}:${mongoPassword}${mongoPath}`;
    mongoose.Promise = global.Promise;
    return mongoose.connect(connectUrl, {
            useNewUrlParser: true
        }).then(() => {
            console.log('Mongodb. Connected to', mongoPath);
            modelBuilders.forEach((builder) =>
                builder.buildModel())
            return 'Connected';
        }, (err) => {
            throw new Error('\n\nMongodb. \nCan not connect to \n"' + connectUrl + '". \n\n' + err.message + '\n\n');
        })
    ;
};
