const path = require('path');
module.exports = {
    wfjobName: "wizzi-starter-netlify/job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'),
    destPath: path.join(__dirname, 'dist'),
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
