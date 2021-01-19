/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\plugins\gatsby-plugin-top-layout\TopLayout.js.ittf
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import theme from '../../src/theme';
export default function TopLayout(props) {
        return  (
                <React.Fragment>
                    <Helmet>
                        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no">
                        </meta>
                    
                        <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet">
                        </link>
                    
                    </Helmet>
                
                    <ThemeProvider theme={theme}>
                    {
                        /**
                             CssBaseline kickstart an elegant, consistent, and simple baseline to build upon.
                        */
                        
                    }<CssBaseline>
                        </CssBaseline>
                    
                    {props.children}</ThemeProvider>
                
                </React.Fragment>
            )
        ;
    }
TopLayout.propTypes = {
    children: PropTypes.node
};
