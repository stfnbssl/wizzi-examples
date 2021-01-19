/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\src\templates\blog-template.js.ittf
*/
'use strict';
import React from "react";
import Helmet from "react-helmet";
export default function Template({data }) {
    console.log('blog-template', data);
    const post = data.contentfulBlogPost;
    return  (
            <div className="blog-post-container">
                <Helmet title={`CodeStack - ${post.title}`}>
                </Helmet>
            
                <div className="blog-post">
                    <h1>
                    {post.title}
                    </h1>
                
                    <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.body.childMarkdownRemark.html }}>
                    </div>
                
                </div>
            
            </div>
        )
    ;
}
export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        contentfulBlogPost(
            slug: {
                eq: $slug
            }
        )
        {
            title, 
            createdAt(formatString: "MMMM DD, YYYY"), 
            body {
                childMarkdownRemark {
                    html
                }
            }
        }}
`
