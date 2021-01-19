/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\src\pages\cheatsheet.js.ittf
*/
'use strict';
import React from "react";
import { graphql } from 'gatsby';
import Link from "gatsby-link";
import Helmet from "react-helmet";
export default ({ data }) => {
    console.log('cheatsheet data', data);
    const { edges: cheats } = data.allCheatsheet;
    return  (
            <div className="blog-posts">
            {
                cheats.map(({ node: cheat }) =>
                    cheat.elements.map((element) => {
                        return  (
                                <div>
                                    <h1>
                                    {element.name}
                                    </h1>
                                
                                {
                                    element.items.map((item) => {
                                        return  (
                                                <div>
                                                    <h3>
                                                    { item.title }
                                                    </h3>
                                                
                                                    <div className="cheatsheet-item">
                                                        <pre className="prettyprint" style={{
                                                            width: '50%'
                                                        }} dangerouslySetInnerHTML={{
                                                            __html: item.ittfPretty
                                                        }}>
                                                        </pre>
                                                    
                                                        <pre style={{
                                                            width: '50%'
                                                        }} dangerouslySetInnerHTML={{
                                                            __html: item.generated
                                                        }}>
                                                        </pre>
                                                    
                                                    </div>
                                                
                                                </div>
                                            )
                                        ;
                                    })
                                }</div>
                            )
                        ;
                    }))
            }</div>
        )
    ;
}
export const pageQuery = graphql`
    query csQuery {
        allCheatsheet(
            filter: {
                csName: {
                    eq: "html"
                }
            }
        )
        {
            edges {
                node {
                    id, 
                    csName, 
                    elements {
                        name, 
                        items {
                            title, 
                            generated, 
                            ittfPretty
                        }
                    }
                }
            }
        }}
`
