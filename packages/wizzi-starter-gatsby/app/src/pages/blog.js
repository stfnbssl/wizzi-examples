/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\src\pages\blog.js.ittf
*/
'use strict';
import React from "react";
import { graphql } from 'gatsby';
import Link from "gatsby-link";
import Helmet from "react-helmet";
import '../styles/blog-listing.css';
export default ({ data }) => {
    console.log('blog graphql data', data);
    const { edges: posts } = data.allContentfulBlogPost;
    return  (
            <div className="blog-posts">
            {
                posts.filter(({ node: post }) => {
                    console.log('post', post);
                    return post.title.length > 0;
                }).map(({ node: post }) => {
                    return  (
                            <div className="blog-post-preview" key={post.id}>
                                <h1>
                                    <Link to={post.slug}>
                                    {post.title}</Link>
                                
                                </h1>
                            
                                <h2>
                                {post.createdAt}
                                </h2>
                            
                                <p>
                                {post.body.childMarkdownRemark.excerpt}
                                </p>
                            
                            </div>
                        )
                    ;
                })
                
            }</div>
        )
    ;
}
export const pageQuery = graphql`
    query blogIndexQuery {
        allContentfulBlogPost(
            filter: {
                node_locale: {
                    eq: "en-US"
                }
            }, 
            sort: {
                order: DESC, 
                fields: [
                    createdAt
                ]
            }
        )
        {
            edges {
                node {
                    id, 
                    title, 
                    slug, 
                    createdAt(formatString: "MMMM DD, YYYY"), 
                    body {
                        childMarkdownRemark {
                            excerpt
                        }
                    }
                }
            }
        }}
`
