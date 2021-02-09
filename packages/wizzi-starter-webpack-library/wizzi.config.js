const path = require('path');
module.exports = {
    wfjobName: "webpack-starter/job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: path.join(__dirname, 'app'),
    plugins: [
        'wizzi-core',
        'wizzi-js',
        'wizzi-web'
    ], 
    schemas: [
    ],
    globalContext: {
        isPackageDeploy: true,
    },
};