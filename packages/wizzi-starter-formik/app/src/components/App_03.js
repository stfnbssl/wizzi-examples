/*
    artifact generator: C:\My\wizzi\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-examples\packages\formik\.wizzi\src\components\App_03.js.ittf
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core';
import compose from 'recompose/compose';
import {Formik, Form, Field, FastField, FieldArray, setFieldValue, setFieldTouched, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {Editor, EditorState, RichUtils} from 'draft-js';
import Debug from './Debug';
import RichEditorExample from './RichEditorExample';
import './formik-example.css';
import './RichEditor.css';
const initialValues = {
    friends: [
        {
            name: '', 
            email: ''
        }
    ], 
    editorState: new EditorState.createEmpty()
};
const validationSchema = Yup.object({
    friends: Yup.array().of(Yup.object({
        name: Yup.string().required('required')
        , 
        email: Yup.string().required('required').email('Invalid email!')
        
    }))
    
});
const styles = theme => (
    {
        root: {
            margin: "200px", 
            width: "400px"
        }
    });

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {
            classes
        } = this.props;
        return  (
                <div className={classes.root}>
                    <div className="formik-example">
                        <h1>
                        Invite friends
                        </h1>
                    
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) =>
                            setTimeout(() =>
                                alert(JSON.stringify(values, null, 2)), 500)}>
                        {
                            ({ values, errors, touched, handleBlur, handleChange, handleReset, setFieldValue, setFieldTouched, isSubmitting }) =>  (
                                    <Form>
                                        <RichEditorExample editorState={values.editorState} onChange={setFieldValue} onBlur={handleBlur}>
                                        </RichEditorExample>
                                    
                                        <FieldArray name="friends">
                                        {
                                            ({push, remove}) =>  (
                                                    <React.Fragment>
                                                    {
                                                        values.friends && values.friends.length > 0 && values.friends.map((friend, index) => {
                                                            return  (
                                                                    <div className="row" key={index}>
                                                                        <div className="col">
                                                                            <Field name={`friends[${index}].name`}>
                                                                            {
                                                                                ({field, form}) =>  (
                                                                                        <input type="text" {...field} placeholder="Annie Dove">
                                                                                        </input>
                                                                                    )
                                                                                
                                                                            }</Field>
                                                                        
                                                                            <ErrorMessage name={`friends[${index}].name`}>
                                                                            {
                                                                                (msg) => {
                                                                                    return  (
                                                                                            <div className="field-error">
                                                                                            {msg}</div>
                                                                                        )
                                                                                    ;
                                                                                }
                                                                            }</ErrorMessage>
                                                                        
                                                                        </div>
                                                                    
                                                                        <div className="col">
                                                                            <Field name={`friends[${index}].email`}>
                                                                            {
                                                                                ({field, form}) =>  (
                                                                                        <input type="email" {...field} placeholder="Annie@example.com">
                                                                                        </input>
                                                                                    )
                                                                                
                                                                            }</Field>
                                                                        
                                                                            <ErrorMessage name={`friends[${index}].email`}>
                                                                            {
                                                                                (msg) => {
                                                                                    return  (
                                                                                            <div className="field-error">
                                                                                            {msg}</div>
                                                                                        )
                                                                                    ;
                                                                                }
                                                                            }</ErrorMessage>
                                                                        
                                                                        </div>
                                                                    
                                                                        <div className="col">
                                                                            <button type="button" onClick={() =>
                                                                                remove(index)}>
                                                                            X</button>
                                                                        
                                                                        </div>
                                                                    
                                                                    </div>
                                                                )
                                                            ;
                                                        })
                                                    }<div className="row">
                                                            <button type="button" className="secondary" disabled={isSubmitting} onClick={() =>
                                                                push({
                                                                    name: '', 
                                                                    email: ''
                                                                })}>
                                                            Add friend</button>
                                                        
                                                        </div>
                                                    
                                                    </React.Fragment>
                                                )
                                            
                                        }</FieldArray>
                                    
                                        <div className="row">
                                            <button type="submit" disabled={isSubmitting}>
                                            Submit</button>
                                        
                                        </div>
                                    
                                        <div className="row">
                                            <button type="button" className="secondary" disabled={isSubmitting}>
                                            Cancel</button>
                                        
                                        </div>
                                    
                                        <Debug>
                                        </Debug>
                                    
                                    </Form>
                                )
                            
                        }</Formik>
                    
                    </div>
                
                </div>
            )
        ;
    }
}
App = compose(withStyles(styles))(App)
;
export default App;
