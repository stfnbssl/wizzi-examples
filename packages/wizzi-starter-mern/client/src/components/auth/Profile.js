/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\auth\Profile.js.ittf
*/
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Paper, Grid} from '@material-ui/core';
import { authApis } from '../../features/auth';
const styles = (theme) => {
    return {
            margin: {
                margin: theme.spacing.unit * 2
            }, 
            padding: {
                padding: theme.spacing.unit
            }
        };
};
class Profile extends React.Component {
    state = {
        user: {}
    };
    _getProfile = async () => {
        try {
            const user = await authApis.localProfile();
            this.setState({
                user: user
            })
        } 
        catch (error) {
            alert(error.status + ' / ' + error.statusText);
        } 
    }
    componentDidMount() {
        this._getProfile();
    }
    render() {
        const {
            classes
        } = this.props;
        const {
            user
        } = this.state;
        return  (
                <Paper className={classes.padding}>
                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <h1>
                            {user.email}
                            </h1>
                        
                        </Grid>
                    
                    </div>
                
                </Paper>
            )
        ;
    }
}
Profile.propTypes = {};
export default withStyles(styles)(Profile);
