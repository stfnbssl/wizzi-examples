/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-studio\.wizzi\ittf\server\webpacks\material-ui-docs\src\components\ui\AppBar\AppBar.js.ittf
*/
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

import Paper from '../Paper';

export const styleSheet = createStyleSheet('WuiAppBar', (theme) => {
    console.log('theme.palette.primary[500]', theme.palette.primary[500]);
    return {
            appBar: {
                display: 'flex', 
                flexDirection: 'column', 
                width: '100%', 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                zIndex: theme.zIndex.appBar
            }, 
            primary: {
                backgroundColor: theme.palette.primary[500], 
                color: theme.palette.getContrastText(theme.palette.primary[500])
            }, 
            accent: {
                backgroundColor: theme.palette.accent.A200, 
                color: theme.palette.getContrastText(theme.palette.accent.A200)
            }
        };
});

function AppBar(props) {
    const { accent, children, classes, className: classNameProp, ...other } = props;
    const className = classNames({
        [classes.appBar]: true, 
        [classes.primary]: !accent, 
        [classes.accent]: accent
    }, classNameProp);
    return  (
            <Paper square elevation={4} className={className} {...other}>
            {children}</Paper>
        )
    ;
}

AppBar.propTypes = {
    accent: PropTypes.bool, 
    children: PropTypes.node, 
    classes: PropTypes.object.isRequired, 
    className: PropTypes.string
};

AppBar.defaultProps = {
    accent: false
};

export default withStyles(styleSheet)(AppBar)
