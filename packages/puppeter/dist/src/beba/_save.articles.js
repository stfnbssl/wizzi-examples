/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\puppeter\.wizzi\src\beba\_save.articles.js.ittf
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
var loginUrl = "https://cosie.lepida.it/";
var guideSearchUrl = "https://cosie.lepida.it/backoffice/newssearch";
var username = "annamaria.davoli@ausl.re.it";
var psw = "AS2rROFo";
var category = "Tutti a tavola";
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
async function start() {
    const browser = await puppeteer.launch({
            headless: true
        });
    const page = await browser.newPage();
    await page.goto(backendLoginUrl);
    await page.type('#username', username);
    await page.type('#password', psw);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    console.log('logged in');
    const links = await page.$$('a.read-more');
    console.log("links", links.length);
    await links[2].click();
    await page.waitForNavigation();
    // we are in the guide/news search page
    await page.select('select[name="categoria"]', IdByCat(category));
    await page.click('#btn_cerca_mappe');
    const articles = await page.$$('#risultati_ricerca a');
    console.log("articles", articles.length);
    const evaluationResult = await page.evaluate(() => {
            try {
                var evaluationResult = {
                    dataList: [
                        
                    ], 
                    messages: [
                        
                    ]
                };
                var risultati_ricerca_length = document.querySelector('select[name="risultati_ricerca_length"]');
                if (risultati_ricerca_length) {
                    evaluationResult.messages.push('risultati_ricerca_length found')
                    risultati_ricerca_length.value = 100;
                }
                function getItem() {
                    var divRisultati = document.querySelectorAll(".dataTables_wrapper");
                    evaluationResult.messages.push('divRisultati ' + divRisultati.length)
                    var trs = document.querySelectorAll("#risultati_ricerca tr");
                    evaluationResult.messages.push('trs ' + trs.length)
                    trs.forEach(function(item, index) {
                        var ths = item.querySelectorAll("th");
                        // _ console.log('index ths', index, ths)
                        var dataItem = {};
                        ths.forEach(function(item2, index2) {
                            var aNode = item2.querySelector("a");
                            if (aNode && !dataItem.href) {
                                // _ console.log(index2, 'href', aNode.href)
                                dataItem.href = aNode.href;
                            }
                            var pNode = item2.querySelector("p");
                            if (pNode) {
                                // _ console.log(index2, 'p.innerText', pNode.innerText)
                                if (index2 == 0) {
                                    dataItem.Titolo = pNode.innerText;
                                }
                                if (index2 == 1) {
                                    dataItem.NewsOrGuida = pNode.innerText;
                                }
                                if (index2 == 2) {
                                    dataItem.Categoria = pNode.innerText;
                                }
                                if (index2 == 7) {
                                    dataItem.User = pNode.innerText;
                                }
                            }
                        })
                        if (dataItem.href) {
                            console.log('dataItem', dataItem);
                            evaluationResult.dataList.push(dataItem);
                        }
                    })
                }
                getItem();
                // var linkNextPage = document.querySelectorAll("#risultati_ricerca_paginate a.next")
                var linkNextPage = document.querySelectorAll(".dataTables_paginate a.next");
                evaluationResult.messages.push('linkNextPage ' + linkNextPage.length)
                if (linkNextPage.length > 0) {
                    linkNextPage[0].click();
                    getItem();
                }
                // _ console.log('dataList', dataList)
                return evaluationResult;
            } 
            catch (ex) {
                evaluationResult.messages.push("Error: " + ex.message)
            } 
        });
    console.log("evaluationResult", evaluationResult.length, evaluationResult);
    file.write(path.join(__dirname, "extracted", category + '.json'), stringify(evaluationResult.dataList, null, 4))
    browser.close();
}
(async function() { await start(); console.log('DONE');}())
