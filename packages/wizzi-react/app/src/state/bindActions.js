/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-react\.wizzi\src\state\bindActions.js.ittf
*/
'use strict';
export default function bindActions(actions, dispatch) {
        const bindAction = (action, dispatch) => {
            return function() {
                    return dispatch(action.apply(null, arguments));
                };
        };
        // if it's a single action
        if (typeof actions === 'function') {
            return bindAction(actions, dispatch);
        }
        if (typeof actions !== 'object' || actions === null) {
            throw new Error(`bindActions expected an object or a function, instead receivedactions === null ? 'null' : typeof actions.`);
        }
        const boundActions = {};
        for (var key in actions) {
            const action = actions[key];
            if (typeof action === 'function') {
                boundActions[key] = bindAction(action, dispatch);
            }
        }
        return boundActions;
    }
