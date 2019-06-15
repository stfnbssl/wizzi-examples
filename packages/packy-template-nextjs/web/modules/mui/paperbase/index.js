/*
    artifact generator: C:\My\wizzi\wizzi-examples\packages\packy-template-nextjs\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-examples\packages\packy-template-nextjs\.wizzi\ittf\src\modules\mui\paperbase\index.js.ittf
    utc time: Mon, 03 Jun 2019 14:53:12 GMT
*/
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './Navigator';
import Header from './Header';
let theme = createMuiTheme({
    typography: {
        useNextVariants: true, 
        h5: {
            fontWeight: 500, 
            fontSize: 26, 
            letterSpacing: 0.5
        }
    }, 
    palette: {
        primary: {
            light: '#63ccff', 
            main: '#009be5', 
            dark: '#006db3'
        }
    }, 
    shape: {
        borderRadius: 8
    }
});
theme = {
    ...theme, 
    overrides: {
        MuiDrawer: {
            paper: {
                backgroundColor: '#18202c'
            }
        }, 
        MuiButton: {
            label: {
                textTransform: 'initial'
            }, 
            contained: {
                boxShadow: 'none', 
                '&:active': {
                    boxShadow: 'none'
                }
            }
        }, 
        MuiTabs: {
            root: {
                marginLeft: theme.spacing.unit
            }, 
            indicator: {
                height: 3, 
                borderTopLeftRadius: 3, 
                borderTopRightRadius: 3, 
                backgroundColor: theme.palette.common.white
            }
        }, 
        MuiTab: {
            root: {
                textTransform: 'initial', 
                margin: '0 16px', 
                minWidth: 0, 
                [theme.breakpoints.up('md')]: {
                    minWidth: 0
                }
            }, 
            labelContainer: {
                padding: 0, 
                [theme.breakpoints.up('md')]: {
                    padding: 0
                }
            }
        }, 
        MuiIconButton: {
            root: {
                padding: theme.spacing.unit
            }
        }, 
        MuiTooltip: {
            tooltip: {
                borderRadius: 4
            }
        }, 
        MuiDivider: {
            root: {
                backgroundColor: '#404854'
            }
        }, 
        MuiListItemText: {
            primary: {
                fontWeight: theme.typography.fontWeightMedium
            }
        }, 
        MuiListItemIcon: {
            root: {
                color: 'inherit', 
                marginRight: 0, 
                '& svg': {
                    fontSize: 20
                }
            }
        }, 
        MuiAvatar: {
            root: {
                width: 32, 
                height: 32
            }
        }
    }, 
    props: {
        MuiTab: {
            disableRipple: true
        }
    }, 
    mixins: {
        ...theme.mixins, 
        toolbar: {
            minHeight: 48
        }
    }
};
const drawerWidth = 256;
const styles = (theme) => {
    return {
            root: {
                display: 'flex', 
                minHeight: '100vh'
            }, 
            drawer: {
                [theme.breakpoints.up('sm')]: {
                    width: drawerWidth, 
                    flexShrink: 0
                }
            }, 
            appContent: {
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column'
            }, 
            mainContent: {
                flex: 1, 
                padding: '48px 36px 0', 
                background: '#eaeff1'
            }
        };
};
class Index extends React.Component {
    state = {
        mobileOpen: false
    };
    handleDrawerToggle = () => {
        this.setState((state) => ({
                mobileOpen: !state.mobileOpen
            }));
    }
    render() {
        const {
            classes
        } = this.props;
        return  (
                <MuiThemeProvider theme={theme}>
                    <div className={classes.root}>
                        <nav className={classes.drawer}>
                            <Hidden smUp implementation="js">
                                <Navigator PaperProps={{
                                    style: {
                                        width: drawerWidth
                                    }
                                }} variant="temporary" open={this.state.mobileOpen} onClose={this.handleDrawerToggle}>
                                </Navigator>
                            
                            </Hidden>
                        
                            <Hidden xsDown implementation="css">
                                <Navigator PaperProps={{
                                    style: {
                                        width: drawerWidth
                                    }
                                }}>
                                </Navigator>
                            
                            </Hidden>
                        
                        </nav>
                    
                        <div className={classes.appContent}>
                            <Header onDrawerToggle={this.handleDrawerToggle}>
                            </Header>
                        
                            <main className={classes.mainContent}>
                            </main>
                        
                        </div>
                    
                    </div>
                
                </MuiThemeProvider>
            )
        ;
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired
}
Index.propTypes = {};
Index.defaultProps = {};
export default withStyles(styles)(Index);
