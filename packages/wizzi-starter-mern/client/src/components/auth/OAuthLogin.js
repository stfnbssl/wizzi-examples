/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\auth\OAuthLogin.js.ittf
*/
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FontAwesome from 'react-fontawesome';
import {config} from '../../features/config';
const styles = (theme) => {
    return {
            'btn': {
                background: 'none', 
                color: 'inherit', 
                border: 'none', 
                padding: '0', 
                font: 'inherit', 
                cursor: 'pointer', 
                outline: 'inherit', 
                marginBottom: '20px', 
                borderRadius: '50%', 
                width: '215px', 
                height: '215px', 
                boxShadow: '1px 2px 2px rgba(0, 0, 0, 0.25)', 
                transitionTimingFunction: 'ease-in', 
                transition: '0.3s', 
                transform: 'scale(0.7)', 
                '&:hover': {
                    boxShadow: '2px 5px 5px rgba(0, 0, 0, 0.5)'
                }, 
                '&.disabled': {
                    backgroundColor: '#999 !important', 
                    cursor: 'no-drop'
                }, 
                '&.disabled:hover': {
                    boxShadow: '1px 2px 2px rgba(0, 0, 0, 0.25)'
                }, 
                '&.disabled:hover span': {
                    textShadow: '1px 2px 2px rgba(0, 0, 0, 0.25)'
                }, 
                '& span': {
                    fontSize: '10em !important', 
                    textShadow: '1px 2px 2px rgba(0, 0, 0, 0.25)', 
                    transition: '0.3s', 
                    color: '#fff'
                }, 
                '&:hover span': {
                    textShadow: '2px 5px 5px rgba(0, 0, 0, 0.5)', 
                    transform: 'rotate(-1.1deg)'
                }, 
                '&.github': {
                    border: '3px solid #ffffff', 
                    background: '#767676'
                }, 
                '&.github:hover': {
                    background: '#6e5494'
                }, 
                '&.twitter': {
                    border: '3px solid #ffffff', 
                    background: '#433e90'
                }, 
                '&.twitter:hover': {
                    background: '#326ada'
                }, 
                '&.google': {
                    border: '3px solid #ffffff', 
                    background: '#0057e7'
                }, 
                '&.google:hover': {
                    background: '#008744'
                }, 
                '&.facebook': {
                    border: '3px solid #ffffff', 
                    background: '#8b9dc3'
                }, 
                '&.facebook:hover': {
                    background: '#3b5998'
                }
            }, 
            'btnWrapper': {
                height: '300px'
            }, 
            'card': {
                backgroundColor: '#FFF', 
                borderRadius: '3%', 
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', 
                wordWrap: 'break-word', 
                width: '215px', 
                height: '100%', 
                marginBottom: '20px', 
                transition: '.5s'
            }, 
            '&:hover': {
                boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.45)'
            }, 
            'close': {
                borderRadius: '50%', 
                textShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)', 
                float: 'right', 
                top: '-228px', 
                right: '-6px', 
                fontSize: '2em', 
                position: 'relative', 
                color: '#fff', 
                transition: '.5s'
            }, 
            '&:hover': {
                cursor: 'pointer', 
                boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)'
            }
        };
};
class OAuthLogin extends React.Component {
    state = {
        user: {}, 
        disabled: ''
    };
    componentDidMount() {
        const {
            socket,
            provider
        } = this.props;
        console.log('components.auth.OAuthLogin.did-mount, socket.id, provider', socket.id, provider);
        socket.on(provider, (user) => {
            console.log('components.auth.OAuthLogin.socket.on, user', user);
            this.popup.close();
            this.setState({
                user
            })
        })
    }
    checkPopup() {
        const check = setInterval(() => {
            const {
                popup
            } = this;
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check);
                this.setState({
                    disabled: ''
                })
            }
        }, 1000);
    }
    openPopup() {
        const {
            provider, 
            socket
        } = this.props;
        const width = 600,
            height = 600;
        const left = (window.innerWidth / 2) - (width / 2);
        const top = (window.innerHeight / 2) - (height / 2);
        const url = `${config.AUTH_PROVIDERS_URL}/${provider}?socketId=${socket.id}`;
        console.log('components.auth.OAuthLogin.socket.id, url', socket.id, url);
        return window.open(url, '', `toolbar=no, location=no, directories=no, status=no, menubar=no, 
     scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
     height=${height}, top=${top}, left=${left}`);
    }
    startAuth = () => {
        if (!this.state.disabled) {
            this.popup = this.openPopup();
            this.checkPopup();
            this.setState({
                disabled: 'disabled'
            })
        }
    }
    closeCard = () => {
        this.setState({
            user: {}
        })
    }
    render() {
        const {
            provider,
            classes
        } = this.props;
        const {
            name, 
            avatar_url
        } = this.state.user;
        const {
            disabled
        } = this.state;
        const atSymbol = provider === 'twitter' ? '@' : '';
        return  (
                <div>
                {
                    name ?  (
                            <div className='card'>
                                <img src={avatar_url} alt={name}>
                                </img>
                            
                                <FontAwesome name='times-circle' className='close' onClick={this.closeCard}>
                                </FontAwesome>
                            
                                <h4>
                                {
                                    `${atSymbol}${name}`
                                }</h4>
                            
                            </div>
                        )
                     :  (
                            <div className={`${classes.btnWrapper} fadein-fast`}>
                                <button onClick={this.startAuth} className={`${classes.btn} ${provider} ${disabled}`}>
                                    <FontAwesome name={provider}>
                                    </FontAwesome>
                                
                                </button>
                            
                            </div>
                        )
                    
                }</div>
            )
        ;
    }
}

OAuthLogin.propTypes = {
    provider: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired
}
OAuthLogin.propTypes = {};
export default withStyles(styles)(OAuthLogin);
