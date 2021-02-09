/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\server\src\features\auth\mongo\token.js.ittf
*/
'use strict';
import { Schema, model } from "mongoose";
export const TokenSchema = new Schema({
    kind: {
        type: String
    }, 
    token: {
        type: String
    }, 
    attributes: {
        type: Map, 
        of: String
    }
});
let tokenModel = null;
export function GetTokenModel() {
    return tokenModel;
}
export const TokenModelBuilder = {
    buildModel: () =>
        tokenModel = model('Token', TokenSchema)
};
