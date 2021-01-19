/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-angular\.wizzi\root\karma.conf.js.ittf
*/
'use strict';
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = function(config) {
    config.set({
        basePath: '', 
        frameworks: [
            'jasmine', 
            '@angular-devkit/build-angular'
        ], 
        plugins: [
            require('karma-jasmine'), 
            require('karma-chrome-launcher'), 
            require('karma-jasmine-html-reporter'), 
            require('karma-coverage'), 
            require('@angular-devkit/build-angular/plugins/karma')
        ], 
        client: {
            jasmine: {}, 
            clearContext: false, 
            // leave Jasmine Spec Runner output visible in browser
            
        }, 
        jasmineHtmlReporter: {
            suppressAll: true, 
            // removes the duplicated traces
            
        }, 
        coverageReporter: {
            dir: require('path').join(__dirname, './coverage/wizzi-angular'), 
            subdir: '.', 
            reporters: [
                {
                    type: 'html'
                }, 
                {
                    type: 'text-summary'
                }
            ]
        }, 
        reporters: [
            'progress', 
            'kjhtml'
        ], 
        port: 9876, 
        colors: true, 
        logLevel: config.LOG_INFO, 
        autoWatch: true, 
        browsers: [
            'Chrome'
        ], 
        singleRun: false, 
        restartOnFileChange: true
    })
};
