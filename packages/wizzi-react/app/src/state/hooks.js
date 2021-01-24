/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-react\.wizzi\src\state\hooks.js.ittf
*/
'use strict';
import {useGlobalStore, itemsActions} from './store';
import bindActions from './bindActions';
//
// useItems Custom Hook
//
export const useItems = () => {
    const {
        state, 
        dispatch
    } = useGlobalStore();
    // List of Props
    const {
        items
    } = state;
    // List of Actions
    const {
        addItem, 
        resetItems, 
        completeItem
    } = itemsActions;
    // Bind Actions
    const boundItemsActions = bindActions({
        addItem, 
        resetItems, 
        completeItem
    }, dispatch);
    return {
            items, 
            ...boundItemsActions
        };
};
