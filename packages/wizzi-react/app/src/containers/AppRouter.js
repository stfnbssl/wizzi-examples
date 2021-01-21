/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-react\.wizzi\src\containers\AppRouter.js.ittf
*/
'use strict';
import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
function AppRouter() {
    return  (
            <Router>
                <div>
                    <Header>
                    </Header>
                
                    <Route exact path="/" component={Home}>
                    </Route>
                
                    <Route path="/about" component={About}>
                    </Route>
                
                    <Route path="/topics" component={Topics}>
                    </Route>
                
                </div>
            
            </Router>
        )
    ;
}
function Home() {
    return  (
            <h2>
            Home</h2>
        )
    ;
}
function About(props) {
    return  (
            <div>
                <h2>
                About</h2>
            
                <pre>
                {JSON.stringify(props, null, 4)}</pre>
            
            </div>
        )
    ;
}
function Topic({history, match, location}) {
    return  (
            <div>
                <h3>
                Requested Param: {match.params.id}</h3>
            
                <h6>
                history
                </h6>
            
                <pre>
                {JSON.stringify(history, null, 4)}</pre>
            
                <h6>
                match
                </h6>
            
                <pre>
                {JSON.stringify(match, null, 4)}</pre>
            
                <h6>
                location
                </h6>
            
                <pre>
                {JSON.stringify(location, null, 4)}</pre>
            
            </div>
        )
    ;
}
function Topics({match}) {
    return  (
            <div>
                <h2>
                Topics</h2>
            
                <ul>
                    <li>
                        <Link to={`${match.url}/components`}>
                        Components</Link>
                    
                    </li>
                
                    <li>
                        <Link to={`${match.url}/props-v-state`}>
                        Props v. State</Link>
                    
                    </li>
                
                </ul>
            
                <Route path={`${match.path}/:id`} component={Topic}>
                </Route>
            
                <Route exact path={match.path} render={() =>  (
                        <h3>
                        Please select a topic.</h3>
                    )
                }>
                </Route>
            
            </div>
        )
    ;
}
function Header() {
    return  (
            <ul>
                <li>
                    <Link to="/">
                    Home</Link>
                
                </li>
            
                <li>
                    <Link to="/about">
                    About</Link>
                
                </li>
            
                <li>
                    <Link to="/topics">
                    Topics</Link>
                
                </li>
            
            </ul>
        )
    ;
}
export default AppRouter;
