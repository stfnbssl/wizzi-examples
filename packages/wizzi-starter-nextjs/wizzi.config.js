const path = require('path');
module.exports = {
    wfjobName: "nextjs-starter.job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: path.join(__dirname, 'dist'),
    plugins: [
        'wizzi-core', 
        'wizzi-js', 
        'wizzi-web',
        'wizzi-meta'
    ], 
    schemas: [
    ],
    globalContext: {
        isPackageDeploy: true,
    },
};