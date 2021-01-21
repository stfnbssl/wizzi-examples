/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-studio\.wizzi\ittf\server\webpacks\material-ui-docs\src\components\ui\Paper\Paper.js.ittf
*/
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';

import warning from 'warning';

export const styleSheet = createStyleSheet('WuiPaper', (theme) => {
    console.log('theme.palette.primary[500]', theme.palette.primary[500]);
    const shadows = {};
    theme.shadows.forEach((shadow, index) =>
        shadows[`dp${index}`] = {
            boxShadow: shadow
        });
    return {
            paper: {
                backgroundColor: theme.palette.background.paper
            }, 
            rounded: {
                borderRadius: 2
            }, 
            ...shadows
        };
});

function Paper(props) {
    const { classes, className: classNameProp, component: ComponentProp, square, elevation, ...other } = props;
    warning(elevation >= 0 && elevation < 25, `Material-UI: this elevation \`${elevation}\` is not implemented.`);
    const classNameElevation = `dp${elevation >= 0 ? elevation : 0}`;
    const className = classNames(classes.paper, classes[classNameElevation], {
        [classes.rounded]: !square
    }, classNameProp);
    return  (
            <ComponentProp className={className} {...other}>
            </ComponentProp>
        )
    ;
}

Paper.propTypes = {
    classes: PropTypes.object.isRequired, 
    className: PropTypes.string, 
    component: PropTypes.oneOfType([
        PropTypes.string, 
        PropTypes.func
    ]), 
    elevation: PropTypes.number, 
    square: PropTypes.bool
};

Paper.defaultProps = {
    component: 'div', 
    elevation: 2, 
    square: false
};

export default withStyles(styleSheet)(Paper)
