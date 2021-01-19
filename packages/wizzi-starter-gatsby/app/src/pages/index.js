/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\src\pages\index.js.ittf
*/
'use strict';
import React from "react";
import {Link, graphql} from 'gatsby';
import DefaultLayout from '@layouts/DefaultLayout';
export default () => {
    return  (
            <DefaultLayout>
                <h1>
                Home page
                </h1>
            
                <ul>
                    <li>
                        <Link to="/blog">
                        Blog</Link>
                    
                    </li>
                
                    <li>
                        <Link to="/about">
                        About</Link>
                    
                    </li>
                
                    <li>
                        <Link to="/mui-index">
                        Mui</Link>
                    
                    </li>
                
                    <li>
                        <Link to="/mui-about">
                        Mui about</Link>
                    
                    </li>
                
                    <li>
                        <Link to="/resolver">
                        Resolver module</Link>
                    
                    </li>
                
                    <li>
                        <Link to="/medium">
                        Medium</Link>
                    
                    </li>
                
                    <li>
                        <Link to="/cheatsheet">
                        Cheatsheet</Link>
                    
                    </li>
                
                    <li>
                        <Link to="/__graphql">
                        Graphql</Link>
                    
                    </li>
                
                </ul>
            
            </DefaultLayout>
        )
    ;
}
