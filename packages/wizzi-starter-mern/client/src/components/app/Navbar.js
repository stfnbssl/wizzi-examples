/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\app\Navbar.js.ittf
*/
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListLink from '../shared/ListLink';
const styles = (theme) => {
    return {
            links: {
                display: 'flex', 
                flexDirection: 'row', 
                backgroundColor: theme.palette.background.paper
            }
        };
};
class NavBar extends React.Component {
    render() {
        const {
            classes
        } = this.props;
        return  (
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                            MERN client starter by Wizzi</Typography>
                        
                            <List component="nav" className={classes.links}>
                                <ListLink to={'/'} primary="Home">
                                </ListLink>
                            
                                <ListLink to={'/create'} primary="Create">
                                </ListLink>
                            
                                <ListLink to={'/index'} primary="Index">
                                </ListLink>
                            
                                <ListLink to={'/login'} primary="Login">
                                </ListLink>
                            
                                <ListLink to={'/register'} primary="Register">
                                </ListLink>
                            
                                <ListLink to={'/loginlab'} primary="LoginLab">
                                </ListLink>
                            
                                <ListLink to={'/profile'} primary="Profile">
                                </ListLink>
                            
                                <ListLink to={'/auth/social'} primary="Social">
                                </ListLink>
                            
                            </List>
                        
                        </Toolbar>
                    
                    </AppBar>
                
                </div>
            )
        ;
    }
}
NavBar.propTypes = {};
export default withStyles(styles)(NavBar);
