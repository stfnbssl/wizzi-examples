/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\App.js.ittf
*/
'use strict';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Navbar from './components/app/Navbar';
import LoginPage from './components/auth/LoginPage';
import LoginLab from './components/auth/LoginLab';
import RegisterPage from './components/auth/RegisterPage';
import Profile from './components/auth/Profile';
import Github from './components/auth/Github';
import GithubLogin from './components/auth/GithubLogin';
import SocialLogin from './components/auth/SocialLogin';
import PostCreate from './components/post/Create';
import PostEdit from './components/post/Edit';
import PostList from './components/post/List';
import GithubCallback from './features/auth/GithubCallback';
// Material UI Theme Customization
import Theme from './styles/muiTheme';
const THEME = createMuiTheme(Theme);
class App extends Component {
    constructor() {
        super();
    }
    render() {
        return  (
                <MuiThemeProvider theme={THEME}>
                    <Router>
                        <div className="container">
                            <Navbar>
                            </Navbar>
                        
                            <Switch>
                                <Route exact path='/create' component={PostCreate}>
                                </Route>
                            
                                <Route path='/edit/:id' component={PostEdit}>
                                </Route>
                            
                                <Route path='/index' component={PostList}>
                                </Route>
                            
                                <Route path='/login' component={LoginPage}>
                                </Route>
                            
                                <Route path='/loginlab' component={LoginLab}>
                                </Route>
                            
                                <Route path='/register' component={RegisterPage}>
                                </Route>
                            
                                <Route path='/profile' component={Profile}>
                                </Route>
                            
                                <Route path='/auth/social' component={SocialLogin}>
                                </Route>
                            
                                <Route path='/auth/github' component={GithubLogin}>
                                </Route>
                            
                                <Route path='/auth/github/callback' component={GithubCallback}>
                                </Route>
                            
                            </Switch>
                        
                        </div>
                    
                    </Router>
                
                </MuiThemeProvider>
            )
        ;
    }
}
export default App;
