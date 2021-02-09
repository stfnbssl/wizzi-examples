/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\post\Create.js.ittf
*/
'use strict';
import React, { Component } from 'react';
import { blogApis } from '../../features/blog';
export default class PostCreate extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                title: '', 
                content: '', 
                author: ''
            };
        }
        onChange = (name) => {
            return (e) =>
                    this.setState({
                        [name]: e.target.value
                    });
        }
        onSubmit = (e) => {
            e.preventDefault();
            const obj = {
                title: this.state.title, 
                content: this.state.content, 
                author: this.state.author
            };
            blogApis.createPost(obj).then((res) => {
                console.log(res);
            })
            this.setState({
                title: '', 
                content: '', 
                author: ''
            })
        }
        onCancel = () => {
            this.props.history.push('/index');
        }
        render() {
            return  (
                    <div>
                        <h3 align="center">
                        Add New Post</h3>
                    
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>
                                Title:  </label>
                            
                                <input type="text" className="form-control" value={this.state.title} onChange={this.onChange('title')}>
                                </input>
                            
                            </div>
                        
                            <div className="form-group">
                                <label>
                                Content: </label>
                            
                                <input type="text" className="form-control" value={this.state.content} onChange={this.onChange('content')}>
                                </input>
                            
                            </div>
                        
                            <div className="form-group">
                                <label>
                                Author: </label>
                            
                                <input type="text" className="form-control" value={this.state.author} onChange={this.onChange('author')}>
                                </input>
                            
                            </div>
                        
                            <div className="form-group">
                                <input type="submit" value="Create" className="btn btn-primary">
                                </input>
                            
                                <button onClick={this.onCancel} className="btn">
                                Cancel</button>
                            
                            </div>
                        
                        </form>
                    
                    </div>
                )
            ;
        }
    }
