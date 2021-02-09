/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\utils\api.js.ittf
*/
'use strict';
const apiUrl = 'http://localhost:5000/api/v1';
export async function callApi(path, options) {
    console.log('callApi request', apiUrl, path, options);
    const res = await fetch(`${apiUrl}/${path}`, {
            method: options.method, 
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json'
            }, 
            body: options.data ? JSON.stringify(options.data) : null
        });
    const json = await res.json();
    console.log('callApi result', json);
    return json;
}
