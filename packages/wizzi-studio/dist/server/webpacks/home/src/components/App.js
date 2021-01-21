/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-studio\.wizzi\ittf\server\webpacks\home\src\components\App.js.ittf
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider, { MUI_SHEET_ORDER } from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { orange, red } from 'material-ui/styles/colors';
import { lightTheme, darkTheme, setPrismTheme } from '../utils/prism';
import AppRouter from './AppRouter';
let styleManager;
function App(props) {
    const { dark } = props;
    const palette = createPalette({
        primary: orange, 
        accent: red, 
        type: (dark ? 'dark' : 'light')
    });
    const theme = createMuiTheme({
        palette
    });
    if (!styleManager) {
        const themeContext = MuiThemeProvider.createDefaultContext({
            theme
        });
        styleManager = themeContext.styleManager;
    }
    else {
        styleManager.updateTheme(theme);
    }
    styleManager.setSheetOrder(MUI_SHEET_ORDER.concat([
        'Link', 
        'AppContent', 
        'AppDrawer', 
        'AppDrawerNavItem', 
        'AppFrame', 
        'MarkdownDocs', 
        'MarkdownElement', 
        'Demo'
    ]));
    if (dark) {
        setPrismTheme(darkTheme);
    }
    else {
        setPrismTheme(lightTheme);
    }
    return  (
            <MuiThemeProvider theme={theme} styleManager={styleManager}>
                <AppRouter>
                </AppRouter>
            
            </MuiThemeProvider>
        )
    ;
}
App.propTypes = {
    dark: PropTypes.bool.isRequired
};
export default connect((state) => {
    return {
            dark: state.dark
        };
})(App)
