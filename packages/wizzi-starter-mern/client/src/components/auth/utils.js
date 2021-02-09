/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\auth\utils.js.ittf
*/
'use strict';
export function toParams(query) {
    const q = query.replace(/^\??\//, '');
    return q.split('&').reduce((values, param) => {
            const [key, value] = param.split('=');
            values[key] = value;
            return values;
        }, {});
}
export function toQuery(params, delimiter = '&') {
    const keys = Object.keys(params);
    return keys.reduce((str, key, index) => {
            let query = `${str}${key}=${params[key]}`;
            if (index < (keys.length - 1)) {
                query += delimiter;
            }
            return query;
        }, '');
}
