/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-studio\.wizzi\ittf\server\webpacks\home\src\components\AppRouter.js.ittf
*/
'use strict';
import React from 'react';
import { applyRouterMiddleware, browserHistory, Router, Route, IndexRoute, } from 'react-router';
import { useScroll } from 'react-router-scroll';
import AppFrame from './AppFrame';
import Home from '../pages/Home';
import AppContent from './AppContent';
import MarkdownDocs from './MarkdownDocs';
import { componentAPIs, requireMarkdown, demos, requireDemo } from './files';
var basepath = "/ittf/demo/apps/wizzifactory/index.html.ittf";
export default function AppRouter() {
    return  (
            <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
                <Route title="Wizzi Factory" path={basepath +  "/"} component={AppFrame}>
                    <IndexRoute dockDrawer component={Home} title={null}>
                    </IndexRoute>
                
                    <Route title="Getting Started" path={basepath +  "/getting-started"} nav component={AppContent}>
                        <Route title="Installation" path={basepath +  "/getting-started/installation"} content={requireMarkdown('./getting-started/installation.md')} component={MarkdownDocs} nav>
                        </Route>
                    
                        <Route title="Usage" path={basepath +  "/getting-started/usage"} content={requireMarkdown('./getting-started/usage.md')} component={MarkdownDocs} nav>
                        </Route>
                    
                        <Route title="Examples" path={basepath +  "/getting-started/examples"} content={requireMarkdown('./getting-started/examples.md')} component={MarkdownDocs} nav>
                        </Route>
                    
                        <Route title="Supported Components" path={basepath +  "/getting-started/supported-components"} content={requireMarkdown('./getting-started/supported-components.md')} component={MarkdownDocs} nav>
                        </Route>
                    
                    </Route>
                
                </Route>
            
            </Router>
        )
    ;
}
