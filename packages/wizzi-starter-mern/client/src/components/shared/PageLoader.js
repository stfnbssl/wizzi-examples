/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\shared\PageLoader.js.ittf
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
const styles = (theme) => ({
        progress: {
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh', 
            margin: theme.spacing.unit * 5
        }
    });
const PageLoader = ({classes}) => {
    return  (
            <div className={classes.progress}>
                <CircularProgress>
                </CircularProgress>
            
            </div>
        )
    ;
};
PageLoader.propTypes = {
    // Material UI Injected
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(PageLoader);
