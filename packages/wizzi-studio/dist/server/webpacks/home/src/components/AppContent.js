/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-studio\.wizzi\ittf\server\webpacks\home\src\components\AppContent.js.ittf
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import MarkdownElement from './MarkdownElement';
const styleSheet = createStyleSheet('AppContent', (theme) => {
    return {
            content: theme.mixins.gutters({
                paddingTop: 80, 
                flex: '1 1 100%', 
                maxWidth: '100%', 
                margin: '0 auto'
            }), 
            [theme.breakpoints.up(948)]: {
                content: {
                    maxWidth: 900
                }
            }
        };
});
function AppContent(props) {
    const { className, classes, children: childrenProp, route } = props;
    let children = childrenProp;
    if (!children) {
        const text = `# Summary${route.childRoutes.map((childRoute) => {
            return `- [${childRoute.title}](${childRoute.path})`;
        }).join('\n')
        }`;
        console.log('AppContent.text', text);
        children =  (
            <MarkdownElement text={text}>
            </MarkdownElement>
        )
        ;
    }
    console.log('AppContent.children', children);
    return  (
            <div className={classNames(classes.content, className)}>
            {children}</div>
        )
    ;
}
AppContent.propTypes = {
    children: PropTypes.node, 
    classes: PropTypes.object.isRequired, 
    className: PropTypes.string, 
    route: PropTypes.object.isRequired
};
export default withStyles(styleSheet)(AppContent);
