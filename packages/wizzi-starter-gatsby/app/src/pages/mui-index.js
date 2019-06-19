/*
    artifact generator: C:\My\wizzi\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-examples\packages\gatsby-starter\.wizzi\src\pages\mui-index.js.ittf
*/
'use strict';
import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
function MadeWithLove() {
    return  (
            <Typography variant="body2" color="textSecondary" align="center">
            {'Built with love by the '}<MuiLink color="inherit" href="https://material-ui.com/">
                Material-UI</MuiLink>
            
            {' team.'}</Typography>
        )
    ;
}
export default function App() {
        return  (
                <Container maxWidth="sm">
                    <Box my={4}>
                        <Typography variant="h4" component="h1" gutterBottom>
                        Gatsby v4-beta example</Typography>
                    
                        <Link to="/mui-about" color="secondary">
                        Go to the about page</Link>
                    
                        <ProTip>
                        </ProTip>
                    
                        <MadeWithLove>
                        </MadeWithLove>
                    
                    </Box>
                
                </Container>
            )
        ;
    }