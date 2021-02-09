/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\auth\RegisterForm.js.ittf
*/
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { authApis } from '../../features/auth';
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
            little: {
                fontSize: '0.7em'
            }
        };
};
const RegisterForm = ({values, errors, isLoading, onChange, onSubmit, classes}) => {
    console.log('features.components.auth.registerform.errors', errors);
    const isFormEnabled = Object.values(values).every((item) =>
        item !== '');
    return  (
            <form className={classes.container} onSubmit={onSubmit}>
                <TextField label="E-email" value={values.email} name="email" onChange={onChange} margin="normal" fullWidth autoComplete="off" error={errors.email && errors.email.length > 0} helperText={errors.email || ''}>
                </TextField>
            
                <TextField label="Password" value={values.password} name="password" onChange={onChange} margin="normal" fullWidth type="password" autoComplete="off" error={errors.password && errors.password.length > 0} helperText={errors.password || ''}>
                </TextField>
            
                <TextField label="Confirm password" value={values.confirm_password} name="confirm_password" onChange={onChange} margin="normal" fullWidth type="password" autoComplete="off" error={errors.confirm_password && errors.confirm_password.length > 0} helperText={errors.confirm_password || ''}>
                </TextField>
            
                <p className={classes.little}>
                Make sure it's more than 15 characters OR at least 8 characters including a number and a lowercase letter. Learn more.</p>
            
                <Button onClick={onSubmit} variant="outlined" color="primary" fullWidth className={classes.button} disabled={!isFormEnabled} type="submit">
                {
                    isLoading ?  (
                            <CircularProgress size={20}>
                            </CircularProgress>
                        )
                     : 'Sign up for wizzi-starter-mern-client'
                }</Button>
            
                <p className={classes.little}>
                By clicking “Sign up for wizzi-starter-mern-client”, you agree to our &nbsp;<a href="/help/terms">
                    terms of service
                    </a>
                
                    <span>
                    &nbsp; and &nbsp;
                    </span>
                
                    <a href="/help/privacy">
                    privacy statement
                    </a>
                
                    <span>
                    . We’ll occasionally send you account related emails.
                    </span>
                
                </p>
            
            </form>
        )
    ;
};
RegisterForm.propTypes = {
    values: PropTypes.object, 
    errors: PropTypes.object, 
    isLoading: PropTypes.bool, 
    onChange: PropTypes.func, 
    onSubmit: PropTypes.func, 
    // Material UI Injected
    classes: PropTypes.object
};
export default withStyles(styles)(RegisterForm);
