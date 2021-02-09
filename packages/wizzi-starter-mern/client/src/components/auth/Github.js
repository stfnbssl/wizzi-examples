/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\auth\Github.js.ittf
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
class Github extends React.Component {
    state = {
        account: {}
    };
    _githubConnect = async () => {
        try {
            const account = await authApis.githubConnect();
            console.log('components.auth.github.account', account);
            this.setState({
                account: account
            })
        } 
        catch (error) {
            alert(error.status + ' / ' + error.statusText);
        } 
    }
    componentDidMount() {
        this._githubConnect();
    }
    render() {
        const {
            classes
        } = this.props;
        const {
            account
        } = this.state;
        return  (
                <Paper className={classes.padding}>
                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <h1>
                            {account.uid}
                            </h1>
                        
                        </Grid>
                    
                    </div>
                
                </Paper>
            )
        ;
    }
}
Github.propTypes = {};
export default withStyles(styles)(Github);
