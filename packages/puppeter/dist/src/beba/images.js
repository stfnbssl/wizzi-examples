/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\puppeter\.wizzi\src\beba\images.js.ittf
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
async function start() {
    const browser = await puppeteer.launch({
            headless: true
        });
    const localPage = await browser.newPage();
    await localPage.goto("http://localhost:3014/ittf/anna/beba_images.html.ittf");
    // document.querySelector('select[name="risultati_ricerca_length"]')
    // document.querySelectorAll("#risultati_ricerca tr")
    // document.querySelectorAll(".dataTables_paginate a.next")
    const pageEvaluationResults = await localPage.evaluate(() => {
            var documentResults = {
                images: [
                    
                ], 
                messages: [
                    
                ]
            };
            try {
                const images = document.querySelectorAll(".upl_img");
                var i, i_items=images, i_len=images.length, img;
                for (i=0; i<i_len; i++) {
                    img = images[i];
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
    browser.close();
}
(async function() { await start(); console.log('DONE');}())
