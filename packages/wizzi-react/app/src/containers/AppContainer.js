/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-react\.wizzi\src\containers\AppContainer.js.ittf
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';

import AppRouter from './AppRouter';
import App from '../components/app';
import Provider from '../state/store';
const AppWrapper = Provider;


class AppContainer extends React.Component {
    handleChangeUserState = (name, value) => {
    }
    render() {
        return  (
                <AppWrapper>
                    <div id="main">
                        <AppRouter>
                        </AppRouter>
                    
                        <App>
                        </App>
                    
                    </div>
                
                </AppWrapper>
            )
        ;
    }
    }
export default AppContainer;
