/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\auth\GithubLogin.js.ittf
*/
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import PopupWindow from './PopupWindow';
import {toQuery} from './utils';
const styles = (theme) => {
    return {};
};
class GitHubLogin extends React.Component {
    onBtnClick = () => {
        const {
            clientId, 
            scope, 
            redirectUri
        } = this.props;
        const search = toQuery({
            client_id: clientId, 
            scope, 
            redirect_uri: redirectUri
        });
        const popup = this.popup = PopupWindow.open('github-oauth-authorize', `https://github.com/login/oauth/authorize?${search}`, {
            height: 1000, 
            width: 600
        });
        this.onRequest();
        popup.then((data) =>
            this.onSuccess(data), (error) =>
            this.onFailure(error))
    }
    onRequest = () => {
        this.props.onRequest();
    }
    onSuccess = (data) => {
        if (!data.code) {
            return this.onFailure(new Error('\'code\' not found'));
        }
        this.props.onSuccess(data);
    }
    onFailure = (error) => {
        this.props.onFailure(error);
    }
    render() {
        const {
            className,
            buttonText,
            children
        } = this.props;
        const attrs = {
            onClick: this.onBtnClick
        };
        if (className) {
            attrs.className = className;
        }
        return  (
                <button {...attrs}>
                {children || buttonText}</button>
            )
        ;
    }
}

GitHubLogin.propTypes = {
    buttonText: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    clientId: PropTypes.string.isRequired,
    onRequest: PropTypes.func,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    redirectUri: PropTypes.string,
    scope: PropTypes.string
}

GitHubLogin.defaultProps  = {
    buttonText: 'Sign in with GitHub',
    redirectUri: '',
    scope: 'user:email'
}
GitHubLogin.propTypes = {};
export default withStyles(styles)(GitHubLogin);
