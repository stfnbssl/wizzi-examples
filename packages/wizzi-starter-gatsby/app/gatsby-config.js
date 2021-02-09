/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\root\gatsby-config.js.ittf
*/
'use strict';
require('dotenv').config();
module.exports = {
    siteMetadata: {
        title: "Gatsby starter by Wizzi"
    }, 
    plugins: [
        {
            resolve: 'gatsby-plugin-module-resolver', 
            options: {
                root: './src', 
                aliases: {
                    '@components': './components', 
                    '@layouts': './layouts', 
                    '@templates': './templates', 
                    '@utils': './utils'
                }
            }
        }, 
        'gatsby-transformer-remark', 
        'gatsby-plugin-react-helmet', 
        {
            resolve: `gatsby-source-contentful`, 
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID || '', 
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || ''
            }
        }, 
        {
            resolve: 'gatsby-source-filesystem', 
            options: {
                name: 'data', 
                path: `${__dirname}/src/data`
            }
        }, 
        'gatsby-transformer-json', 
        {
            resolve: 'gatsby-plugin-typography', 
            options: {
                pathToConfigModule: 'src/utils/typography'
            }
        }, 
        {
            resolve: 'gatsby-source-mongodb', 
            options: {
                dbName: process.env.MONGODB_DBNAME, 
                collection: [
                    'accounts'
                ], 
                server: {
                    address: process.env.MONGODB_ADDRESS, 
                    port: process.env.MONGODB_PORT
                }, 
                auth: {
                    user: process.env.MONGODB_USER, 
                    password: process.env.MONGODB_PASSWORD
                }, 
                map: {
                    
                }
            }
        }, 
        {
            resolve: 'gatsby-source-medium', 
            options: {
                // To test the limit parameter
                // Replace the publication username with a user
                // Limit is optional - set quite low as example user doesn't have that many posts
                // username: `@ReactEurope`,
                username: '@ReactEurope', 
                limit: 20
            }
        }, 
        {
            resolve: 'gatsby-source-wizzi', 
            options: {
                src: `${__dirname}/src/models/ittf/cheatsheets`
            }
        }
    ]
};
