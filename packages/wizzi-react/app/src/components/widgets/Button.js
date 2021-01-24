/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-react\.wizzi\src\components\widgets\Button.js.ittf
*/
'use strict';
import React from 'react';
import './Button.css';
const Button = (props) => {
    let buttonClasses = 'button';
    buttonClasses += ` button-${props.theme}`;
    if (props.large) {
        buttonClasses += ' button-large';
    }
    if (props.fill) {
        buttonClasses += ' button-fill';
    }
    if (props.loading) {
        buttonClasses += ' button-loading';
    }
    return  (
            <button type={props.type} disabled={props.loading} className={buttonClasses} onClick={props.onClick}>
            {
                props.loading &&  (
                    <span className='button-spinner'>
                    </span>
                )
                
            }{
                props.icon &&  (
                    <span className='button-icon'>
                    Icon</span>
                )
                
            }<span className='button-text'>
                {props.text}</span>
            
            </button>
        )
    ;
};
Button.defaultProps = {
    // Button Text
    text: '', 
    // Button Theme
    theme: 'primary', 
    // Button Type
    type: 'button', 
    // Button Size
    large: false, 
    // Button Filled
    fill: false, 
    // Button Loading
    loading: false, 
    // Button onClick
    onClick: () => {
    }
};
export default Button;
