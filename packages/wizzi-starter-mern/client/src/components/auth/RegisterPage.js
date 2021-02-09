/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\auth\RegisterPage.js.ittf
*/
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import RegisterForm from './RegisterForm';
import { authApis } from '../../features/auth';
const styles = (theme) => {
    return {
            container: {
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                backgroundColor: '#607d8b'
            }
        };
};
class RegisterPage extends React.Component {
    state = {
        formValues: {
            email: '', 
            password: '', 
            confirm_password: ''
        }, 
        formErrors: {
            
        }, 
        isLoading: false, 
        isSnackbarOpen: false, 
        snackbarMessage: '', 
        abortController: null
    };
    _handleChangeForm = (event) => {
        this.setState({
            formValues: {
                ...this.state.formValues, 
                [event.target.name]: event.target.value
            }
        })
    }
    _setFieldError = (name, errorInfo) => {
        this.setState({
            formErrors: {
                ...this.state.formErrors, 
                [name]: errorInfo
            }
        })
    }
    _validateForm = () => {
        const { formValues } = this.state;
        this.setState({
            formErrors: {}
        })
        let isFormValid = true;
        if ((formValues.email && formValues.email.length > 0) == false) {
            this._setFieldError('email', 'Required field')
            isFormValid = false;
        }
        if ((formValues.password && formValues.password.length > 0) == false) {
            this._setFieldError('password', 'Required field')
            isFormValid = false;
        }
        if ((formValues.confirm_password && formValues.confirm_password.length > 0) == false) {
            this._setFieldError('confirm_password', 'Required field')
            isFormValid = false;
        }
        if (formValues.password !== formValues.confirm_password) {
            this._setFieldError('confirm_password', 'Does not match')
            isFormValid = false;
        }
        return isFormValid;
    }
    _handleSubmitForm = async (event) => {
        event.preventDefault();
        if (this._validateForm() == false) {
            return ;
        }
        const {
            history
        } = this.props;
        const {
            formValues
        } = this.state;
        console.log('components.auth.registerpage._handleSubmitForm.formValues', formValues);
        try {
            var controller = new AbortController();
            this.setState({
                isLoading: true, 
                abortController: controller
            })
            const result = await authApis.localRegister({
                    email: formValues.email, 
                    password: formValues.password, 
                    abortSignal: controller.signal
                });
            console.log('components.auth.registerpage._handleSubmitForm.result', result);
            this.setState({
                isLoading: false, 
                abortController: null
            })
            history.push('/profile');
        } 
        catch (error) {
            if (error.name === 'AbortError') {
                console.log('components.auth.registerpage._handleSubmitForm.AbortError');
            }
            else {
                console.log('components.auth.registerpage._handleSubmitForm.error', error);
                const {
                    message, 
                    errorCode, 
                    errors
                } = error;
                if (errorCode === '401') {
                    this.onToggleSnackbar({
                        message
                    })
                }
                else if (errors) {
                    this._handleToggleSnackbar({
                        message: "Invalid parameters"
                    })
                }
                this.setState({
                    isLoading: false, 
                    abortController: null
                })
            }
        } 
    }
    _handleToggleSnackbar = ({message}) => {
        this.setState((state) => {
            return {
                    isSnackbarOpen: !state.isSnackbarOpen, 
                    snackbarMessage: message
                };
        })
    }
    render() {
        const { classes } = this.props;
        const {
            formValues, 
            formErrors, 
            isLoading, 
            isSnackbarOpen, 
            snackbarMessage
        } = this.state;
        return  (
                <div className={classes.container}>
                    <h1>
                    Register
                    </h1>
                
                    <RegisterForm values={formValues} errors={formErrors} isLoading={isLoading} onChange={this._handleChangeForm} onSubmit={this._handleSubmitForm}>
                        <Snackbar anchorOrigin={{
                            vertical: 'bottom', 
                            horizontal: 'left'
                        }} open={isSnackbarOpen} autoHideDuration={6000} onClose={this._handleToggleSnackbar} ContentProps={{
                            'aria-describedby': 'message-id'
                        }} message={ (
                            <span id="message-id">
                            {snackbarMessage}</span>
                        )
                        }>
                        </Snackbar>
                    
                    </RegisterForm>
                
                </div>
            )
        ;
    }
}
RegisterPage.propTypes = {};
export default withStyles(styles)(RegisterPage);
