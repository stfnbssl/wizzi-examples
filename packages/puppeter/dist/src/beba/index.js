/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\puppeter\.wizzi\src\beba\index.js.ittf
*/
'use strict';
const fs = require('fs');
const puppeteer = require('puppeteer');
const stringify = require('json-stringify-safe');
var loginUrl = "https://cosie.lepida.it/";
var guideSearchUrl = "https://cosie.lepida.it/backoffice/newssearch";
var username = "annamaria.davoli@ausl.re.it";
var psw = "AS2rROFo";
var category = "Tutti a tavola";
async function start() {
    const browser = await puppeteer.launch({
            headless: true
        });
    const page = await browser.newPage();
    await page.goto(loginUrl);
    await page.type('#username', username);
    await page.type('#password', psw);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    console.log('logged in');
    await page.setViewport({ width: 1280, height: 800 });
    await page.screenshot({ path: 'images/loggedin.png', fullPage: true });
    const links = await page.$$('a.read-more');
    console.log("links", links.length);
    await links[2].click();
    await page.waitForNavigation();
    // we are in the guide/news search page
    await page.type('select[name="categoria"', category);
    await page.click('#btn_cerca_mappe');
    const articles = await page.$$('#risultati_ricerca a');
    console.log("articles", articles.length);
    const urls = await page.evaluate(() =>
            Array.from(document.querySelectorAll('#risultati_ricerca a'), (element) =>
                element.href));
    console.log("urls", urls.length, urls);
    const extractedData = {
        category: category, 
        items: [
            
        ]
    };
    var i, i_items=urls, i_len=urls.length, url;
    for (i=0; i<i_len; i++) {
        url = urls[i];
        if (url.indexOf('remove') < 0) {
            if (i < 1000) {
                console.log("Goto", url);
                await page.goto(url);
                const itemData = await extractFormData(page);
                itemData.url = url;
                extractedData.items.push(itemData)
            }
        }
    }
    browser.close();
    fs.writeFileSync(category + '_items', stringify(extractedData, null, 4))
}
(async function() { await start(); console.log('DONE');}())
var formFields = [
    {
        id: "NWS_ID", 
        label: "Id", 
        type: ""
    }, 
    {
        id: "NWS_FK_TNW_ID", 
        label: "Titolo", 
        type: ""
    }, 
    {
        id: "NWS_FK_TCL_ID", 
        label: "Categoria", 
        type: ""
    }, 
    {
        id: "NWS_FK_TPN_ID", 
        label: "Tipo", 
        type: ""
    }, 
    {
        id: "NWS_SETTIMANA_DAL", 
        label: "Settimana dal", 
        type: "", 
        newId: "SettimanaDal"
    }, 
    {
        id: "NWS_SETTIMANA_AL", 
        label: "Settimana al", 
        type: "", 
        newId: "SettimanaAl"
    }, 
    {
        id: "NWS_DATA_DAL", 
        label: "Data dal", 
        type: ""
    }, 
    {
        id: "NWS_DATA_AL", 
        label: "Data al", 
        type: ""
    }, 
    {
        id: "NWS_TESTO", 
        label: "Testo", 
        type: "", 
        newId: "Testo"
    }, 
    {
        id: "NWS_ABSTRACT", 
        label: "Abstract", 
        type: "", 
        newId: "Abstract"
    }, 
    {
        id: "NWS_URL_SITOWEB", 
        label: "Sito web", 
        type: ""
    }, 
    {
        id: "NWS_URL_VIDEO", 
        label: "Url video", 
        type: ""
    }, 
    {
        id: "NWS_IMG_COPERTINA", 
        label: "Immagine copertina", 
        type: ""
    }, 
    {
        id: "NWS_IMG_ANTEPRIMA", 
        label: "Immagine anteprima", 
        type: ""
    }
];
async function extractFormData(page) {
    var result = {};
    var i, i_items=formFields, i_len=formFields.length, field;
    for (i=0; i<i_len; i++) {
        field = formFields[i];
        try {
            const value = await page.$eval('#' + field.id, input => { return input.value });
            if (field.newId) {
                result[field.newId] = value;
            }
            else {
                result[field.id] = value;
            }
        } 
        catch (ex) {
            result[field.id] = ex.message;
        } 
    }
    result.Titolo = TitById(result["NWS_FK_TNW_ID"]);
    result.Categoria = CatById(result["NWS_FK_TCL_ID"]);
    console.log('extractFormData.result', result);
    return result;
}
const Categorie = [
    {
        label: "Bambino", 
        id: "1"
    }, 
    {
        label: "Famiglia", 
        id: "2"
    }, 
    {
        label: "Pediatra", 
        id: "3"
    }, 
    {
        label: "Tutti a tavola", 
        id: "4"
    }, 
    {
        label: "Temi caldi", 
        id: "21"
    }, 
    {
        label: "NpL-NpM", 
        id: "22"
    }, 
    {
        label: "Giochi-Movimento", 
        id: "23"
    }, 
    {
        label: "Vaccinazioni", 
        id: "24"
    }, 
    {
        label: "Cosa mangiamo oggi?", 
        id: "25"
    }
];
function CatById(id) {
    var i, i_items=Categorie, i_len=Categorie.length, item;
    for (i=0; i<i_len; i++) {
        item = Categorie[i];
        if (item.id == id) {
            return item.label;
        }
    }
    return "*** not found";
}
const Titoli = [
    {
        label: "Nascita", 
        id: "1"
    }, 
    {
        label: "15 giorni", 
        id: "2"
    }, 
    {
        label: "1 mese", 
        id: "3"
    }, 
    {
        label: "2 mesi", 
        id: "4"
    }, 
    {
        label: "3 mesi", 
        id: "5"
    }, 
    {
        label: "4 mesi", 
        id: "6"
    }, 
    {
        label: "5 mesi", 
        id: "7"
    }, 
    {
        label: "6 mesi", 
        id: "8"
    }, 
    {
        label: "7 mesi", 
        id: "9"
    }, 
    {
        label: "8 mesi", 
        id: "10"
    }, 
    {
        label: "9 mesi", 
        id: "11"
    }, 
    {
        label: "10 mesi", 
        id: "12"
    }, 
    {
        label: "11 mesi", 
        id: "13"
    }, 
    {
        label: "1 anno", 
        id: "14"
    }, 
    {
        label: "13 mesi", 
        id: "15"
    }, 
    {
        label: "14 mesi", 
        id: "16"
    }, 
    {
        label: "15 mesi", 
        id: "17"
    }, 
    {
        label: "16 mesi", 
        id: "18"
    }, 
    {
        label: "17 mesi", 
        id: "19"
    }, 
    {
        label: "18 mesi", 
        id: "20"
    }, 
    {
        label: "19 mesi", 
        id: "21"
    }, 
    {
        label: "20 mesi", 
        id: "22"
    }, 
    {
        label: "21 mesi", 
        id: "23"
    }, 
    {
        label: "22 mesi", 
        id: "24"
    }, 
    {
        label: "23 mesi", 
        id: "25"
    }, 
    {
        label: "2 anni", 
        id: "50"
    }, 
    {
        label: "2 anni e 2 mesi", 
        id: "27"
    }, 
    {
        label: "2 anni e 4 mesi", 
        id: "29"
    }, 
    {
        label: "2 anni e 6 mesi", 
        id: "31"
    }, 
    {
        label: "2 anni e 8 mesi", 
        id: "32"
    }, 
    {
        label: "2 anni e 10 mesi", 
        id: "33"
    }, 
    {
        label: "3 anni", 
        id: "34"
    }, 
    {
        label: "3 anni e 2 mesi", 
        id: "35"
    }, 
    {
        label: "3 anni e 4 mesi", 
        id: "36"
    }, 
    {
        label: "3 anni e 6 mesi", 
        id: "37"
    }, 
    {
        label: "3 anni e 8 mesi", 
        id: "38"
    }, 
    {
        label: "3 anni e 10 mesi", 
        id: "39"
    }, 
    {
        label: "4 anni", 
        id: "40"
    }, 
    {
        label: "4 anni e 3 mesi", 
        id: "41"
    }, 
    {
        label: "4 anni e 6 mesi", 
        id: "42"
    }, 
    {
        label: "4 anni e 9 mesi", 
        id: "43"
    }, 
    {
        label: "5 anni", 
        id: "45"
    }, 
    {
        label: "5 anni e 3 mesi", 
        id: "46"
    }, 
    {
        label: "5 anni e 6 mesi", 
        id: "47"
    }, 
    {
        label: "5 anni e 9 mesi", 
        id: "48"
    }, 
    {
        label: "6 anni", 
        id: "49"
    }
];
function TitById(id) {
    var i, i_items=Titoli, i_len=Titoli.length, item;
    for (i=0; i<i_len; i++) {
        item = Titoli[i];
        if (item.id == id) {
            return item.label;
        }
    }
    return "*** not found";
}
