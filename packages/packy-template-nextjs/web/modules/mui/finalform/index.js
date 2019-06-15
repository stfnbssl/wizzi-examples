/*
    artifact generator: C:\My\wizzi\wizzi-examples\packages\packy-template-nextjs\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-examples\packages\packy-template-nextjs\.wizzi\ittf\src\modules\mui\finalform\index.js.ittf
    utc time: Mon, 03 Jun 2019 14:53:12 GMT
*/
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Field} from 'react-final-form';
import {TextField, Checkbox, Radio, Select} from 'final-form-material-ui';
import {Typography, Paper, Link, Grid, Button, CssBaseline, RadioGroup, FormLabel, MenuItem, FormGroup, FormControl, FormControlLabel} from '@material-ui/core';
// Picker
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, TimePicker, DatePicker} from 'material-ui-pickers';
function DatePickerWrapper(props) {
    const {
        input: {
            name, 
            onChange, 
            value, 
            ...restInput
        }, 
        meta, 
        ...rest
    } = props;
    const showError = meta.submitError && !meta.dirtySinceLastSubmit || meta.error && meta.touched;
    return  (
            <DatePicker {...rest} name={name} helperText={showError ? meta.error || meta.submitError : undefined} error={showError} inputProps={restInput} onChange={onChange} value={value === '' ? null : value}>
            </DatePicker>
        )
    ;
}
function TimePickerWrapper(props) {
    const {
        input: {
            name, 
            onChange, 
            value, 
            ...restInput
        }, 
        meta, 
        ...rest
    } = props;
    const showError = meta.submitError && !meta.dirtySinceLastSubmit || meta.error && meta.touched;
    return  (
            <TimePicker {...rest} name={name} helperText={showError ? meta.error || meta.submitError : undefined} error={showError} inputProps={restInput} onChange={onChange} value={value === '' ? null : value}>
            </TimePicker>
        )
    ;
}
const onSubmit = async (values) => {
    const sleep = (ms) => {
        new Promise((resolve) =>
            setTimeout(resolve, ms));
    };
    await sleep(300);
    if (typeof(window) !== 'undefined') {
        window.alert(JSON.stringify(values, 0, 2));
    }
};
const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    }
    if (!values.email) {
        errors.email = 'Required';
    }
    return errors;
};
function App() {
    return  (
            <div style={{
                padding: 16, 
                margin: 'auto', 
                maxWidth: 600
            }}>
                <CssBaseline>
                </CssBaseline>
            
                <Typography variant="h4" align="center" component="h1" gutterBottom>
                \n        🏁 React Final Form\n      </Typography>
            
                <Typography variant="h5" align="center" component="h2" gutterBottom>
                \n        Material-UI Example\n      </Typography>
            
                <Typography paragraph>
                    <Link href="https://github.com/erikras/react-final-form#-react-final-form">
                    \n          Read Docs\n        </Link>
                
                \n        . This example demonstrates using{' '}<Link href="https://material-ui.com/demos/text-fields/">
                    \n          Material-UI\n        </Link>
                
                {' '}\n        form controls.\n      </Typography>
            
                <Form onSubmit={onSubmit} initialValues={{
                    employed: true, 
                    stooge: 'larry'
                }} validate={validate} render={({handleSubmit, reset, submitting, pristine, values}) =>  (
                        <form onSubmit={handleSubmit} noValidate>
                            <Paper style={{
                                padding: 16
                            }}>
                                <Grid container alignItems="flex-start" spacing={8}>
                                    <Grid item xs={6}>
                                        <Field fullWidth required name="firstName" component={TextField} type="text" label="First Name">
                                        </Field>
                                    
                                    </Grid>
                                
                                    <Grid item xs={6}>
                                        <Field fullWidth required name="lastName" component={TextField} type="text" label="Last Name">
                                        </Field>
                                    
                                    </Grid>
                                
                                    <Grid item xs={12}>
                                        <Field name="email" fullWidth required component={TextField} type="email" label="Email">
                                        </Field>
                                    
                                    </Grid>
                                
                                    <Grid item xs={12}>
                                        <FormControlLabel label="Employed" control={ (
                                            <Field name="employed" component={Checkbox} type="checkbox">
                                            </Field>
                                        )
                                        }>
                                        </FormControlLabel>
                                    
                                    </Grid>
                                
                                    <Grid item>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">
                                            Best Stooge</FormLabel>
                                        
                                            <RadioGroup row>
                                                <FormControlLabel label="Larry" control={ (
                                                    <Field name="stooge" component={Radio} type="radio" value="larry">
                                                    </Field>
                                                )
                                                }>
                                                </FormControlLabel>
                                            
                                                <FormControlLabel label="Moe" control={ (
                                                    <Field name="stooge" component={Radio} type="radio" value="moe">
                                                    </Field>
                                                )
                                                }>
                                                </FormControlLabel>
                                            
                                                <FormControlLabel label="Curly" control={ (
                                                    <Field name="stooge" component={Radio} type="radio" value="curly">
                                                    </Field>
                                                )
                                                }>
                                                </FormControlLabel>
                                            
                                            </RadioGroup>
                                        
                                        </FormControl>
                                    
                                    </Grid>
                                
                                    <Grid item>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">
                                            Sauces</FormLabel>
                                        
                                            <FormGroup row>
                                                <FormControlLabel label="Ketchup" control={ (
                                                    <Field name="sauces" component={Checkbox} type="checkbox" value="ketchup">
                                                    </Field>
                                                )
                                                }>
                                                </FormControlLabel>
                                            
                                                <FormControlLabel label="Mustard" control={ (
                                                    <Field name="sauces" component={Checkbox} type="checkbox" value="mustard">
                                                    </Field>
                                                )
                                                }>
                                                </FormControlLabel>
                                            
                                                <FormControlLabel label="Salsa" control={ (
                                                    <Field name="sauces" component={Checkbox} type="checkbox" value="salsa">
                                                    </Field>
                                                )
                                                }>
                                                </FormControlLabel>
                                            
                                                <FormControlLabel label="Guacamole 🥑" control={ (
                                                    <Field name="sauces" component={Checkbox} type="checkbox" value="guacamole">
                                                    </Field>
                                                )
                                                }>
                                                </FormControlLabel>
                                            
                                            </FormGroup>
                                        
                                        </FormControl>
                                    
                                    </Grid>
                                
                                    <Grid item xs={12}>
                                        <Field fullWidth name="notes" component={TextField} multiline label="Notes">
                                        </Field>
                                    
                                    </Grid>
                                
                                    <Grid item xs={12}>
                                        <Field fullWidth name="city" component={Select} label="Select a City" formControlProps={{
                                            fullWidth: true
                                        }}>
                                            <MenuItem value="London">
                                            London</MenuItem>
                                        
                                            <MenuItem value="Paris">
                                            Paris</MenuItem>
                                        
                                            <MenuItem value="Budapest">
                                            \n                      A city with a very long Name\n                    </MenuItem>
                                        
                                        </Field>
                                    
                                    </Grid>
                                
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid item xs={6}>
                                            <Field name="rendez-vous" component={DatePickerWrapper} fullWidth margin="normal" label="Rendez-vous">
                                            </Field>
                                        
                                        </Grid>
                                    
                                        <Grid item xs={6}>
                                            <Field name="alarm" component={TimePickerWrapper} fullWidth margin="normal" label="Alarm">
                                            </Field>
                                        
                                        </Grid>
                                    
                                    </MuiPickersUtilsProvider>
                                
                                    <Grid item style={{
                                        marginTop: 16
                                    }}>
                                        <Button type="button" variant="contained" onClick={reset} disabled={submitting || pristine}>
                                        \n                    Reset\n                  </Button>
                                    
                                    </Grid>
                                
                                    <Grid item style={{
                                        marginTop: 16
                                    }}>
                                        <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                                        \n                    Submit\n                  </Button>
                                    
                                    </Grid>
                                
                                </Grid>
                            
                            </Paper>
                        
                            <pre>
                            {JSON.stringify(values, 0, 2)}</pre>
                        
                        </form>
                    )
                }>
                </Form>
            
            </div>
        )
    ;
}
export default App;
