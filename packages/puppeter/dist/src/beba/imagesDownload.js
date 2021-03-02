/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\puppeter\.wizzi\src\beba\imagesDownload.js.ittf
*/
'use strict';
var category = "Famiglia";
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
    const backendPage = await browser.newPage();
    const categoryDetails = file.readJSON(path.join(__dirname, "extracted", category + '.detail.json'));
    var i, i_items=categoryDetails.items, i_len=categoryDetails.items.length, item;
    for (i=0; i<i_len; i++) {
        item = categoryDetails.items[i];
        if (item.images && item.images.length > 0) {
            var j, j_items=item.images, j_len=item.images.length, image;
            for (j=0; j<j_len; j++) {
                image = item.images[j];
                var viewSource = await backendPage.goto(image.src);
                fs.writeFile(path.join("C:\\Users\\Stefano Bassoli\\Pictures\\Cosie\\Backend", image.title), await viewSource.buffer(), function(err) {
                    if (err) {
                        console.log(err);
                        return ;
                    }
                    console.log("Image" + image.title + " saved!");
                })
            }
        }
    }
    browser.close();
}
(async function() { await start(); console.log('DONE');}())
