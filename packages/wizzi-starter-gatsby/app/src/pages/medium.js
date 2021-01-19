/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\src\pages\medium.js.ittf
*/
'use strict';
import React from "react";
import {graphql} from "gatsby";
const mediumCDNUrl = 'https://cdn-images-1.medium.com/max/150/';
const IndexPage = ({data}) => {
    const posts = data.allMediumPost.edges;
    return  (
            <div>
                <h1>
                Example showing Medium posts
                </h1>
            
                <main>
                {
                    posts.map((post) =>  (
                            <article key={post.node.id}>
                                <h2>
                                {post.node.title}</h2>
                            
                                <h3>
                                by {post.node.author.name}</h3>
                            
                                <img src={`${mediumCDNUrl}/${post.node.virtuals.previewImage.imageId}`} alt={post.node.title} width="150">
                                </img>
                            
                            </article>
                        )
                    )
                }</main>
            
            </div>
        )
    ;
};
export default IndexPage;
// Increase the `limit` parameter to get more posts
export const pageQuery = graphql`
 query {
   allMediumPost(limit: 5, sort: { fields: [createdAt], order: DESC }) {
     edges {
       node {
         id
         title
         author {
           name
         }
         virtuals {
           previewImage {
             imageId
           }
         }
       }
     }
   }
 }
`;
