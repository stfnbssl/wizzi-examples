/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\site\controllers\home.js.ittf
*/
'use strict';
import {Router} from 'express';
export class HomeController {
    constructor() {
        this.router = Router();
    }
    initialize(initValues) {
        this.router.get('/', this.home);
    }
    home(request, response) {
        response.render('home/index.html.ittf', {
            title: 'Site Home'
        })
    }
}
