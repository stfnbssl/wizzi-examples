/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-angular\.wizzi\e2e\protractor.conf.js.ittf
*/
'use strict';
// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const {
    SpecReporter, 
    StacktraceOption
} = require('jasmine-spec-reporter');
//
exports.config = {
    allScriptsTimeout: 11000, 
    specs: [
        './src/**/*.e2e-spec.ts'
    ], 
    capabilities: {
        browserName: 'chrome'
    }, 
    directConnect: true, 
    SELENIUM_PROMISE_MANAGER: false, 
    baseUrl: 'http://localhost:4200/', 
    framework: 'jasmine', 
    jasmineNodeOpts: {
        showColors: true, 
        defaultTimeoutInterval: 30000, 
        print: function() {
        }
    }, 
    onPrepare() {
        require('ts-node').register({
            project: require('path').join(__dirname, './tsconfig.json')
        })
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: StacktraceOption.PRETTY
            }
        }))
    }
    
};
