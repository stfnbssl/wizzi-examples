/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\src\layouts\CheatsheetLayout.js.ittf
*/
'use strict';
import React from "react";
import Link from "gatsby-link";
import '../styles/normalize.css';
import '../styles/cheatsheet.css';
import "../styles/prism.css";
import {useCheatsheetIndex} from "../hooks/useCheatsheetIndex";
export default ({ children, slug }) => {
    return  (
            <div className="cheatsheet-page">
                <div className="cheatsheet-sidebar">
                    <div className="cheatsheet-sidebar-schemas">
                    {
                        useCheatsheetIndex().map(({ node: cheat }) => {
                            return  (
                                    <Link to={`/cheatsheet/${cheat.slug}`}>
                                    {cheat.csName}</Link>
                                )
                            ;
                        })
                    }</div>
                
                    <div className="cheatsheet-sidebar-items">
                    {
                        useCheatsheetIndex().map(({ node: cheat }) => {
                            if (cheat.slug === slug) {
                                return cheat.elements.map((element) => {
                                        return  (
                                                <div>
                                                    <div className="cheatsheet-sidebar-element-title">
                                                    {element.name}</div>
                                                
                                                    <ul>
                                                    {
                                                        element.items.map((item, index) => {
                                                            return  (
                                                                    <li key={index}>
                                                                        <a href={'#' + item.itemSlug}>
                                                                        {item.title}
                                                                        </a>
                                                                    
                                                                    </li>
                                                                )
                                                            ;
                                                        })
                                                    }</ul>
                                                
                                                </div>
                                            )
                                        ;
                                    });
                            }
                        })
                    }</div>
                
                </div>
            
                <div className="cheatsheet-content">
                { children }</div>
            
            </div>
        )
    ;
}
