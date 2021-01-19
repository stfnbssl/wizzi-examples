/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\src\templates\cheatsheet-template.js.ittf
*/
'use strict';
import React from "react";
import Helmet from "react-helmet";
import CheatsheetLayout from '@layouts/CheatsheetLayout';
export default function Template({data}) {
    console.log('cheatsheet-template', data);
    const cheat = data.cheatsheet;
    return  (
            <CheatsheetLayout slug={ cheat.slug }>
                <Helmet title={`Cheatsheet schema - ${cheat.csName}`}>
                </Helmet>
            
            {
                cheat.elements.map((element) => {
                    return  (
                            <div>
                                <div className="cheatsheet-element-title">
                                {element.name}</div>
                            
                            {
                                element.items.map((item) => {
                                    return  (
                                            <div>
                                                <div className="cheatsheet-item-title" id={item.itemSlug}>
                                                { item.title }</div>
                                            
                                                <div className="cheatsheet-item">
                                                    <div className="cheatsheet-ittf">
                                                        <pre className="prettyprint" dangerouslySetInnerHTML={{
                                                            __html: item.ittfPretty
                                                        }}>
                                                        </pre>
                                                    
                                                    </div>
                                                
                                                    <div className="cheatsheet-generated">
                                                        <pre dangerouslySetInnerHTML={{
                                                            __html: item.generatedHighlighted
                                                        }}>
                                                        </pre>
                                                    
                                                    </div>
                                                
                                                </div>
                                            
                                            </div>
                                        )
                                    ;
                                })
                            }</div>
                        )
                    ;
                })
            }</CheatsheetLayout>
        )
    ;
}
export const pageQuery = graphql`
    query cheatsheetBySlug($slug: String!) {
        cheatsheet(
            slug: {
                eq: $slug
            }
        )
        {
            id, 
            csName, 
            slug, 
            elements {
                name, 
                items {
                    title, 
                    itemSlug, 
                    generated, 
                    generatedHighlighted, 
                    ittfPretty
                }
            }
        }}
`
