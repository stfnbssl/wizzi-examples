/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\auth\LoginForm.js.ittf
*/
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const styles = (theme) => {
    return {
            container: {
                backgroundColor: '#fff', 
                padding: `${theme.margin * 1.5}px ${theme.margin}px`, 
                width: 450, 
                borderRadius: 6, 
                margin: '0 auto'
            }, 
            button: {
                borderColor: theme.palette.primary.main, 
                marginTop: theme.margin
            }, 
            rememberforgotContainer: {
                marginTop: theme.margin * 2
            }
        };
};
const RegisterForm = ({values, errors, isLoading, onChange, onSubmit, classes}) => {
    const isFormEnabled = Object.values(values).every((item) =>
        item !== '');
    return  (
            <form className={classes.container} onSubmit={onSubmit}>
                <TextField label="E-email" value={values.email} name="email" onChange={onChange} margin="normal" fullWidth autoComplete="off" error={errors.email && errors.email.length > 0} helperText={errors.email || ''}>
                </TextField>
            
                <TextField label="Password" value={values.password} name="password" onChange={onChange} margin="normal" fullWidth type="password" autoComplete="off" error={errors.password && errors.password.length > 0} helperText={errors.password || ''}>
                </TextField>
            
                <Button onClick={onSubmit} variant="outlined" color="primary" fullWidth className={classes.button} disabled={!isFormEnabled} type="submit">
                {
                    isLoading ?  (
                            <CircularProgress size={20}>
                            </CircularProgress>
                        )
                     : 'Sign in'
                }</Button>
            
                <Grid className={classes.rememberforgotContainer} container alignItems="center" justify="space-between">
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
            
            </form>
        )
    ;
};
RegisterForm.propTypes = {
    value: PropTypes.object, 
    errors: PropTypes.object, 
    isLoading: PropTypes.bool, 
    onChange: PropTypes.func, 
    onSubmit: PropTypes.func, 
    // Material UI Injected
    classes: PropTypes.object
};
export default withStyles(styles)(RegisterForm);
