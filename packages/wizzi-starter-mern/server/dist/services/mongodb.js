/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\services\mongodb.js.ittf
*/
'use strict';

var mongoose = require('mongoose');

module.exports = function start(config, modelBuilders) {
  var mongoUser = config.mongoUser,
      mongoPassword = config.mongoPassword,
      mongoPath = config.mongoPath;
  var connectUrl = "mongodb+srv://".concat(mongoUser, ":").concat(mongoPassword).concat(mongoPath);
  mongoose.Promise = global.Promise;
  return mongoose.connect(connectUrl, {
    useNewUrlParser: true
  }).then(function () {
    console.log('Mongodb. Connected to', mongoPath);
    modelBuilders.forEach(function (builder) {
      return builder.buildModel();
    });
    return 'Connected';
  }, function (err) {
    throw new Error('\n\nMongodb. \nCan not connect to \n"' + connectUrl + '". \n\n' + err.message + '\n\n');
  });
};