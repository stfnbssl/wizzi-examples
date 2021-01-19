const path = require('path');
module.exports = {
    wfjobName: "wizzi-angular/job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: path.join(__dirname, 'app'),
    plugins: [
        './wizzi/packages/wizzi-core/dist/index.js',
        './wizzi/packages/wizzi-js/dist/index.js',
        './wizzi/packages/wizzi-web/dist/index.js'
    ], 
    pluginsBaseFolder: path.join(__dirname, '..', '..', '..'),
    schemas: [
    ],
    globalContext: {
        isPackageDeploy: true,
    },
};