/*
    artifact generator: C:\My\wizzi\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-examples\packages\mern-starter\.wizzi\server\src\features\auth\mongo\account.js.ittf
*/
'use strict';
import { Schema, model } from "mongoose";
import { TokenSchema } from "./token";
const AccountSchema = new Schema({
    domain: {
        type: String
    }, 
    uid: {
        type: String
    }, 
    username: {
        type: String
    }, 
    displayName: {
        type: String
    }, 
    avatar_url: {
        type: String
    }, 
    tokens: [TokenSchema]
});
let accountModel = null;
export function GetAccountModel() {
    return accountModel;
}
export const AccountModelBuilder = {
    buildModel: () =>
        accountModel = model('Account', AccountSchema)
};
