/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-angular\.wizzi\e2e\src\app.po.ts.ittf
*/
import {browser, by, element} from 'protractor';
export class AppPage {
    async navigateTo():  Promise<unknown> {
        return browser.get(browser.baseUrl);
    }
    async getTitleText():  Promise<string> {
        return element(by.css('app-root .content span')).getText();
    }
}
