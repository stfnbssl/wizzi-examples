/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\auth\LoginLab.js.ittf
*/
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Paper, Grid, TextField, Button, FormControlLabel, Checkbox} from '@material-ui/core';
import {Face, Fingerprint} from '@material-ui/icons';
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
class LoginLab extends React.Component {
    render() {
        const {
            classes
        } = this.props;
        return  (
                <Paper className={classes.padding}>
                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Face>
                                </Face>
                            
                            </Grid>
                        
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="username" label="Username" type="email" fullWidth autoFocus required>
                                </TextField>
                            
                            </Grid>
                        
                        </Grid>
                    
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Fingerprint>
                                </Fingerprint>
                            
                            </Grid>
                        
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="username" label="Password" type="password" fullWidth required>
                                </TextField>
                            
                            </Grid>
                        
                        </Grid>
                    
                        <Grid container alignItems="center" justify="space-between">
                            <Grid item>
                                <FormControlLabel control={ (
                                    <Checkbox color="primary">
                                    </Checkbox>
                                )
                                } label="Remember me">
                                </FormControlLabel>
                            
                            </Grid>
                        
                            <Grid item>
                                <Button disableFocusRipple disableRipple style={{
                                    textTransform: "none"
                                }} variant="text" color="primary">
                                Forgot password ?</Button>
                            
                            </Grid>
                        
                        </Grid>
                    
                        <Grid container justify="center" style={{
                            marginTop: '10px'
                        }}>
                            <Button variant="outlined" color="primary" style={{
                                textTransform: "none"
                            }}>
                            Login</Button>
                        
                        </Grid>
                    
                    </div>
                
                </Paper>
            )
        ;
    }
}
LoginLab.propTypes = {};
export default withStyles(styles)(LoginLab);
