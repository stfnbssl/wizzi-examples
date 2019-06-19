/*
    artifact generator: C:\My\wizzi\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-examples\packages\mern-starter\.wizzi\client\src\components\shared\ListLink.js.ittf
*/
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const styles = (theme) => {
    return {};
};
class ListLink extends React.Component {
    renderLink = (itemProps) => {
        return  (
                <Link to={this.props.to} {...itemProps}>
                </Link>
            )
        ;
    }
    render() {
        const {
            icon,
            primary
        } = this.props;
        return  (
                <li>
                    <ListItem button component={this.renderLink}>
                        <ListItemText primary={primary}>
                        </ListItemText>
                    
                    </ListItem>
                
                </li>
            )
        ;
    }
}

ListLink.propTypes = {
    primary: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired
}
ListLink.propTypes = {};
export default withStyles(styles)(ListLink);
