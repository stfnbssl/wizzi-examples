/*
    artifact generator: C:\My\wizzi\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-examples\packages\formik\.wizzi\src\components\Debug.js.ittf
*/
'use strict';
import React from 'react';
import {FormikConsumer} from 'formik';
export default () =>  (
            <div style={{
                margin: '3rem 0', 
                borderRadius: 4, 
                background: '#f6f8fa', 
                boxShadow: '0 0 1px  #eee inset'
            }}>
                <div style={{
                    textTransform: 'uppercase', 
                    fontSize: 11, 
                    borderTopLeftRadius: 4, 
                    borderTopRightRadius: 4, 
                    fontWeight: 500, 
                    padding: '.5rem', 
                    background: '#555', 
                    color: '#fff', 
                    letterSpacing: '1px'
                }}>
                Formik State</div>
            
                <FormikConsumer>
                {
                    ({validationSchema, validate, onSubmit, ...rest}) =>  (
                            <pre style={{
                                fontSize: '.65rem', 
                                padding: '.25rem .5rem', 
                                overflowX: 'scroll'
                            }}>
                            {JSON.stringify(rest, null, 2)}</pre>
                        )
                    
                }</FormikConsumer>
            
            </div>
        )
