/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\features\auth\api.js.ittf
*/
'use strict';
import { config } from '../config';
import { getTokens, setTokens } from './storage';
const AUTH_URL = config.AUTH_URL;
export async function localLogin({email, password}) {
    return callApi('local/login', {
            method: 'post', 
            data: {
                user: {
                    email, 
                    password
                }
            }
        }).then((data) => {
            console.log('features.auth.api.localLogin.data', data);
            setTokens(data.user.token, data.user.refresh_token);
            return {
                    status: 'ok', 
                    user: 'logged on'
                };
        })
    ;
}
export async function localRegister({email, password, abortSignal}) {
    console.log('features.auth.api.localRegister.email,password,abortSignal', email,password,abortSignal);
    return callApi('local/register', {
            method: 'post', 
            abortSignal: abortSignal, 
            data: {
                user: {
                    email, 
                    password
                }
            }
        }).then((data) => {
            console.log('features.auth.api.localRegister.data', data);
            setTokens(data.user.token, data.user.refresh_token);
            return {
                    status: 'ok', 
                    user: 'registered'
                };
        })
    ;
}
export function localProfile() {
    const tokens = getTokens();
    return callApi(`local/profile`, {
            method: 'get', 
            token: tokens.token
        }).then((data) => {
            console.log('features.auth.api.localProfile.data', data);
            return data.user;
        })
    ;
}
export function githubConnect() {
    const tokens = getTokens();
    return callApi(`github/connect`, {
            method: 'get', 
            token: tokens.token
        }).then((data) => {
            console.log('features.auth.api.githubAccount.data', data);
            return data.account;
        })
    ;
}
async function callApi(path, options) {
    if (options.abortSignal && options.abortSignal.aborted) {
        console.log('features.auth.api.callApi.aborted at start');
        return Promise.reject(new DOMException('Aborted', 'AbortError'));
    }
    return new Promise(async (resolve, reject) => {
            if (options.abortSignal) {
                // Begin doing thimgs, and call resolve(result) when done.
                // But also, watch for signals
                options.abortSignal.addEventListener('abort', () => {
                    // Stop doing things, and
                    console.log('features.auth.api.callApi.aborted');
                    reject(new DOMException('Aborted', 'AbortError'));
                })
            }
            console.log('callApi request', AUTH_URL, path, options);
            const headers = {
                Accept: 'application/json', 
                'Content-Type': 'application/json'
            };
            if (options.token) {
                headers['Authorization'] = `Token ${options.token}`;
            }
            console.log('features.auth.api.callApi.headers', headers);
            try {
                const res = await fetch(`${AUTH_URL}/${path}`, {
                        method: options.method, 
                        headers, 
                        body: options.data ? JSON.stringify(options.data) : null
                    });
                console.log('callApi result.res', res);
                if (res.ok) {
                    const json = await res.json();
                    console.log('callApi result.json', json);
                    if (json.errors) {
                        reject(json);
                    }
                    else {
                        resolve(json);
                    }
                }
                else {
                    reject(res);
                }
            } 
            catch (error) {
                reject(error);
            } 
        });
}
