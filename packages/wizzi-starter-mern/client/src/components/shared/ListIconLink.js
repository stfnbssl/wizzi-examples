/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\shared\ListIconLink.js.ittf
*/
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
const styles = (theme) => {
    return {};
};
class ListIconLink extends React.Component {
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
                        <ListItemIcon>
                        {icon}</ListItemIcon>
                    
                        <ListItemText primary={primary}>
                        </ListItemText>
                    
                    </ListItem>
                
                </li>
            )
        ;
    }
}

ListIconLink.propTypes = {
    icon: PropTypes.node.isRequired,
    primary: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired
}
ListIconLink.propTypes = {};
export default withStyles(styles)(ListIconLink);
