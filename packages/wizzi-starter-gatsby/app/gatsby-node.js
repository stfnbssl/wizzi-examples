/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\root\gatsby-node.js.ittf
*/
'use strict';
const path = require("path");
exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators;
    return new Promise((resolve, reject) =>
            createBlogPages(createPage, graphql, function(err) {
                if (err) {
                    return reject(err);
                }
                createCheatsheetPages(createPage, graphql, function(err) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve();
                })}));
};
function createBlogPages(createPage, graphql, callback) {
    const blogPostTemplate = path.resolve(`src/templates/blog-template.js`);
    graphql(`
    {
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
            }, 
            limit: 1000
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
                            excerpt(pruneLength: 250)
                        }
                    }
                }
            }
        }
    }
    `).then((result) => {
        console.log('gatsby-node.result', result);
        if (result.errors) {
            return callback(result.errors);
        }
        result.data.allContentfulBlogPost.edges.forEach(({ node }) => {
            console.log('gatsby-node.createPage', 'blog/' + node.slug);
            createPage({
                path: 'blog/' + node.slug, 
                component: blogPostTemplate, 
                context: {
                    slug: node.slug
                }
            });
            console.log('gatsby-node.callback');
            return callback(null);
        });
    })
}
function createCheatsheetPages(createPage, graphql, callback) {
    const cheatsheetTemplate = path.resolve(`src/templates/cheatsheet-template.js`);
    graphql(`
    {
        allCheatsheet {
            edges {
                node {
                    id, 
                    slug
                }
            }
        }
    }
    `).then((result) => {
        console.log('createCheatsheetPages.gatsby-node.result', result);
        if (result.errors) {
            return callback(result.errors);
        }
        result.data.allCheatsheet.edges.forEach(({ node }) => {
            console.log('gatsby-node.createPage', 'cheatsheet/' + node.slug);
            createPage({
                path: 'cheatsheet/' + node.slug, 
                component: cheatsheetTemplate, 
                context: {
                    slug: node.slug
                }
            });
            console.log('createCheatsheetPages.gatsby-node.callback');
            callback(null);
        });
    })
}
