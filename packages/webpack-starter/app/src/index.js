/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\webpack-starter\.wizzi\src\index.js.ittf
*/
'use strict';
// for module hotReplacement
// see https://nativescript.org/blog/deep-dive-into-hot-module-replacement-with-webpack-part-two-handling-updates/
// import printMe from './print.js'
import './index.css';
function page() {
    const element = panel('main');
    const fa_panel = panel('fa-panel');
    const thumbsup_icon = icon('thumbs-up');
    const arrowleft_icon = icon('arrow-left');
    const hello_panel = panel('hello-panel', 'Hello webpack');
    fa_panel.appendChild(arrowleft_icon);
    fa_panel.appendChild(thumbsup_icon);
    element.appendChild(fa_panel);
    element.appendChild(hello_panel);
    return element;
}
function panel(cn, innerHTML) {
    const element = document.createElement('div');
    element.className = cn;
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    return element;
}
function icon(name) {
    const element = document.createElement('i');
    element.className = 'fas fa-' + name + ' fa-5x';
    return element;
}
const rootElement = page();
document.body.appendChild(rootElement);
if (module.hot) {
    module.hot.accept([
        './print.js'
    ], function() {
        console.log('Accepting the updated printMe module!');
        document.body.removeChild(rootElement);
        // Re-render the "component" to update the click handler
        rootElement(page());
        document.body.appendChild(rootElement);
    });
}
