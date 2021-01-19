/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\src\hooks\useCheatsheetIndex.js.ittf
*/
'use strict';
import {useStaticQuery, graphql} from "gatsby";
const hookQuery = graphql`
    query csIndex {
        allCheatsheet(
            sort: {
                order: ASC, 
                fields: [
                    csName
                ]
            }
        )
        {
            edges {
                node {
                    id, 
                    csName, 
                    slug, 
                    elements {
                        name, 
                        items {
                            title, 
                            itemSlug
                        }
                    }
                }
            }
        }}
`
;
export const useCheatsheetIndex = () => {
    const { allCheatsheet } = useStaticQuery(hookQuery);
    return allCheatsheet.edges;
};
