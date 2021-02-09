/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\containers\Routes.js.ittf
*/
'use strict';
import React, {lazy, Suspense} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';
// Helpers
import {APP_TOKEN} from './api/Constants';
// Utils
import PageLoader from '../components/common/PageLoader';
// Routes
const AuthLayout = lazy(() =>
    import('../components/auth/layout/MainLayout'));
const LoginPage = lazy(() =>
    import('../components/public/login/LoginPage'));
const NoMatchPage = lazy(() =>
    import('../components/not-found/NoMatchPage'));
const Routes = () => {
    return  (
            <Suspense fallback={ (
                <PageLoader>
                </PageLoader>
            )
            }>
                <Switch>
                    <Route exact path="/" render={() =>  (
                            <Redirect to="/login">
                            </Redirect>
                        )
                    }>
                    </Route>
                
                    <Route exact path="/login" render={(props) => {
                        return APP_TOKEN.notEmpty ?  (
                                    <Redirect to="/auth">
                                    </Redirect>
                                )
                             :  (
                                    <LoginPage {...props}>
                                    </LoginPage>
                                )
                        ;
                    }}>
                    </Route>
                
                    <Route path="/auth" render={(props) => {
                        // return APP_TOKEN.notEmpty ? <AuthLayout {...props} /> : <Redirect to="/login" />;
                        return  (
                                <AuthLayout {...props}>
                                </AuthLayout>
                            )
                        ;
                    }}>
                    </Route>
                
                    <Route component={NoMatchPage}>
                    </Route>
                
                </Switch>
            
            </Suspense>
        )
    ;
};
Routes.propTypes = {
    // React Router Passed Props
    location: PropTypes.object
};
export default Routes;
