/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-angular\.wizzi\e2e\src\app.e2e-spec.ts.ittf
*/
import {AppPage} from './app.po';
import {browser, logging} from 'protractor';
describe('workspace-project App', () => {
    let page: AppPage;
    beforeEach(() =>
        page = new AppPage())
    it('should display welcome message', async () => {
        await page.navigateTo();
        expect(await page.getTitleText()).toEqual('wizzi-angular app is running!')
    })
    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER)
        ;
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE
        } as logging.Entry))
    })
})
