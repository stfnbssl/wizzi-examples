const puppeteer = require('puppeteer');

var loginUrl = "https://cosie.lepida.it/";
var guideSearchUrl = "https://cosie.lepida.it/backoffice/newssearch"
var username = "annamaria.davoli@ausl.re.it";
var psw = "AS2rROFo";
var pngPath = "cosie.lepida.png";

function screenshot () {
    (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(loginUrl);
    await page.screenshot({ path: 'cosie.lepida.png' });

    await browser.close();
    })();
}

function login () {
    (async () => {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(loginUrl)
        await page.type('#username', username)
        await page.type('#password', psw)
        await page.click('button[type="submit"]')
        await page.waitForNavigation()
        // we are logged in
        const links = await page.$$('a.read-more')
        // console.log("links", links.length, links[0])
        await links[2].click()
        await page.waitForNavigation()
        // we are in the guide/news search page
        await page.type('select[name="categoria"', "Bambino")
        await page.click('#btn_cerca_mappe')
        // await page.waitForNavigation()
        const articles = await page.$$('#risultati_ricerca a')
        console.log("articles", articles.length)
        const urls = await page.evaluate(() => Array.from(document.querySelectorAll('#risultati_ricerca a'), element => element.href));
        console.log("urls", urls.length, urls)
        for (let i = 0, total_urls = 3 /*urls.length*/; i < total_urls; i++) {
            if (urls[i].indexOf('remove') < 0) {
                console.log("Goto", urls[i]);
                await page.goto(urls[i]);
                // await page.waitForNavigation()
                await page.setViewport({ width: 1280, height: 800 })
                await page.screenshot({ path: 'images/art_' + i + '.png', fullPage: true })
            }
        }
        
        /*
        await articles[0].click()
        await page.waitForNavigation()
        await page.setViewport({ width: 1280, height: 800 })
        await page.screenshot({ path: 'images/art_0.png', fullPage: true })
        await page.goBack()
        */
        // await page.waitForNavigation()
        await page.setViewport({ width: 1280, height: 800 })
        await page.screenshot({ path: 'images/news.png', fullPage: true })
        /*
        await page.setViewport({ width: 1280, height: 800 })
        await page.screenshot({ path: pngPath, fullPage: true })
        */
        browser.close()
    })();
}

login();