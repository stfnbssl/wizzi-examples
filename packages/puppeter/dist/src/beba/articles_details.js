/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\puppeter\.wizzi\src\beba\articles_details.js.ittf
*/
'use strict';
// useful https://api.jquery.com/category/selectors/
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const stringify = require('json-stringify-safe');
const wizziUtils = require('wizzi-utils');
const verify = wizziUtils.verify;
const file = wizziUtils.file;
var backendLoginUrl = "https://cosie.lepida.it/";
var username = "annamaria.davoli@ausl.re.it";
var psw = "AS2rROFo";
var category = "Giochi-Movimento";
async function start() {
    const browser = await puppeteer.launch({
            headless: true
        });
    const backEndPage = await browser.newPage();
    const articlesLinks = file.readJSON(path.join(__dirname, "extracted", category + '.json'));
    await backEndPage.goto(backendLoginUrl);
    await backEndPage.type('#username', username);
    await backEndPage.type('#password', psw);
    await backEndPage.click('button[type="submit"]');
    await backEndPage.waitForNavigation();
    console.log('logged in');
    const extractedData = {
        category: category, 
        items: [
            
        ]
    };
    var i, i_items=articlesLinks, i_len=articlesLinks.length, item;
    for (i=0; i<i_len; i++) {
        item = articlesLinks[i];
        if (item.href.indexOf('remove') < 0) {
            if (i < 10000) {
                console.log("Goto", item.href);
                await backEndPage.goto(item.href);
                const itemData = await extractFormData(backEndPage);
                itemData.url = item.href;
                itemData.User = item.User;
                itemData.NewsOrGuida = item.NewsOrGuida;
                // document.querySelector('select[name="risultati_ricerca_length"]')
                // document.querySelectorAll("#risultati_ricerca tr")
                // document.querySelectorAll(".dataTables_paginate a.next")
                const pageEvaluationResults = await backEndPage.evaluate(() => {
                        var documentResults = {
                            images: [
                                
                            ], 
                            messages: [
                                
                            ]
                        };
                        try {
                            const images = document.querySelectorAll(".upl_img");
                            var j, j_items=images, j_len=images.length, img;
                            for (j=0; j<j_len; j++) {
                                img = images[j];
                                documentResults.images.push({
                                    src: img.src, 
                                    title: img.title
                                })
                            }
                            function addMessage(message) {
                                documentResults.messages.push(message)
                            }
                        } 
                        catch (ex) {
                            documentResults.messages.push("Error: " + ex.message)
                        } 
                        return documentResults;
                    });
                console.log("pageEvaluationResults", pageEvaluationResults);
                itemData.images = pageEvaluationResults.images;
                extractedData.items.push(itemData)
            }
        }
    }
    browser.close();
    file.write(path.join(__dirname, "extracted", category + '.detail.json'), stringify(extractedData, null, 4))
}
(async function() { await start(); console.log('DONE');}())
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
function IdByCat(label) {
    var i, i_items=Categorie, i_len=Categorie.length, item;
    for (i=0; i<i_len; i++) {
        item = Categorie[i];
        if (item.label == label) {
            return item.id;
        }
    }
    return "*** not found";
}
const Titoli = [
    {
        label: "Nascita", 
        id: "1", 
        sort: 1
    }, 
    {
        label: "15 giorni", 
        id: "2", 
        sort: 2
    }, 
    {
        label: "1 mese", 
        id: "3", 
        sort: 3
    }, 
    {
        label: "2 mesi", 
        id: "4", 
        sort: 4
    }, 
    {
        label: "3 mesi", 
        id: "5", 
        sort: 5
    }, 
    {
        label: "4 mesi", 
        id: "6", 
        sort: 6
    }, 
    {
        label: "5 mesi", 
        id: "7", 
        sort: 7
    }, 
    {
        label: "6 mesi", 
        id: "8", 
        sort: 8
    }, 
    {
        label: "7 mesi", 
        id: "9", 
        sort: 9
    }, 
    {
        label: "8 mesi", 
        id: "10", 
        sort: 10
    }, 
    {
        label: "9 mesi", 
        id: "11", 
        sort: 11
    }, 
    {
        label: "10 mesi", 
        id: "12", 
        sort: 12
    }, 
    {
        label: "11 mesi", 
        id: "13", 
        sort: 13
    }, 
    {
        label: "1 anno", 
        id: "14", 
        sort: 14
    }, 
    {
        label: "13 mesi", 
        id: "15", 
        sort: 15
    }, 
    {
        label: "14 mesi", 
        id: "16", 
        sort: 16
    }, 
    {
        label: "15 mesi", 
        id: "17", 
        sort: 17
    }, 
    {
        label: "16 mesi", 
        id: "18", 
        sort: 18
    }, 
    {
        label: "17 mesi", 
        id: "19", 
        sort: 19
    }, 
    {
        label: "18 mesi", 
        id: "20", 
        sort: 20
    }, 
    {
        label: "19 mesi", 
        id: "21", 
        sort: 21
    }, 
    {
        label: "20 mesi", 
        id: "22", 
        sort: 22
    }, 
    {
        label: "21 mesi", 
        id: "23", 
        sort: 23
    }, 
    {
        label: "22 mesi", 
        id: "24", 
        sort: 24
    }, 
    {
        label: "23 mesi", 
        id: "25", 
        sort: 25
    }, 
    {
        label: "2 anni", 
        id: "50", 
        sort: 26
    }, 
    {
        label: "2 anni e 2 mesi", 
        id: "27", 
        sort: 27
    }, 
    {
        label: "2 anni e 4 mesi", 
        id: "29", 
        sort: 28
    }, 
    {
        label: "2 anni e 6 mesi", 
        id: "31", 
        sort: 29
    }, 
    {
        label: "2 anni e 8 mesi", 
        id: "32", 
        sort: 30
    }, 
    {
        label: "2 anni e 10 mesi", 
        id: "33", 
        sort: 31
    }, 
    {
        label: "3 anni", 
        id: "34", 
        sort: 32
    }, 
    {
        label: "3 anni e 2 mesi", 
        id: "35", 
        sort: 33
    }, 
    {
        label: "3 anni e 4 mesi", 
        id: "36", 
        sort: 34
    }, 
    {
        label: "3 anni e 6 mesi", 
        id: "37", 
        sort: 35
    }, 
    {
        label: "3 anni e 8 mesi", 
        id: "38", 
        sort: 36
    }, 
    {
        label: "3 anni e 10 mesi", 
        id: "39", 
        sort: 37
    }, 
    {
        label: "4 anni", 
        id: "40", 
        sort: 38
    }, 
    {
        label: "4 anni e 3 mesi", 
        id: "41", 
        sort: 39
    }, 
    {
        label: "4 anni e 6 mesi", 
        id: "42", 
        sort: 40
    }, 
    {
        label: "4 anni e 9 mesi", 
        id: "43", 
        sort: 41
    }, 
    {
        label: "5 anni", 
        id: "45", 
        sort: 42
    }, 
    {
        label: "5 anni e 3 mesi", 
        id: "46", 
        sort: 43
    }, 
    {
        label: "5 anni e 6 mesi", 
        id: "47", 
        sort: 44
    }, 
    {
        label: "5 anni e 9 mesi", 
        id: "48", 
        sort: 45
    }, 
    {
        label: "6 anni", 
        id: "49", 
        sort: 46
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
function SortByTitId(id) {
    var i, i_items=Titoli, i_len=Titoli.length, item;
    for (i=0; i<i_len; i++) {
        item = Titoli[i];
        if (item.id == id) {
            return item.sort;
        }
    }
    return "*** not found";
}
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
    result.sort = SortByTitId(result["NWS_FK_TNW_ID"]);
    result.Categoria = CatById(result["NWS_FK_TCL_ID"]);
    console.log('extractFormData.result', result);
    return result;
}
