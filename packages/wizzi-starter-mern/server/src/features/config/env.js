/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\features\config\env.js.ittf
*/
'use strict';
import path from 'path';
import {cleanEnv, str, bool, port} from 'envalid';
let config = null;
function validateEnv() {
    return {
            PORT: 5000, 
            SESSION_SECRET: "axr45hngmuoil9********0ofgt*kjj6767648%$£3f5&/4bnsa-----qq4)$35670qq4q", 
            MONGO_USER: "yanez", 
            MONGO_PASSWORD: "3zMsma2szSKDefi1", 
            MONGO_PATH: "@cluster0.idlk7.mongodb.net/wizzi?retryWrites=true&w=majority", 
            GITHUB_CLIENT_ID: "6a42cd4cb7247bb4e823", 
            GITHUB_CLIENT_SECRET: "dedced0ac262cae62557e4c3f567a6227b17bfb7", 
            GITHUB_CALLBACK_URL: "http://localhost:5000/auth/github/callback", 
            CORS_CLIENT_ORIGIN: "http://localhost:8080"
        };
}
export default function create() {
    if (config == null) {
        const __ittfPath = path.join(__dirname, '..', '..', '..', '..', 'ittf');
        const checkedEnv = validateEnv();
        config = {
            port: checkedEnv.PORT, 
            sessionSecret: checkedEnv.SESSION_SECRET, 
            mongoPath: checkedEnv.MONGO_PATH, 
            mongoUser: checkedEnv.MONGO_USER, 
            mongoPassword: checkedEnv.MONGO_PASSWORD, 
            githubClientID: checkedEnv.GITHUB_CLIENT_ID, 
            githubClientSecret: checkedEnv.GITHUB_CLIENT_SECRET, 
            githubCallbackURL: checkedEnv.GITHUB_CALLBACK_URL, 
            corsClientOrigin: checkedEnv.CORS_CLIENT_ORIGIN, 
            MetaHtmlIttfPath: path.join(__ittfPath, 'meta', 'html', 'index.html.ittf'), 
            MetaFolderIttfPath: path.join(__ittfPath, 'meta', 'folder', 'index.html.ittf'), 
            MetaHtmlTextPath: path.join(__ittfPath, 'meta', 'text', 'index.html.ittf')
        };
        Object.keys(config).forEach((element) => {
            if (element.indexOf("Pass") < 0 && element.indexOf("Secr") < 0) {
                console.log('Created config', element, config[element]);
            }
        })
    }
    return config;
}
