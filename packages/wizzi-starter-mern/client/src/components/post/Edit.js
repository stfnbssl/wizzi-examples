/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\post\Edit.js.ittf
*/
'use strict';
import React, { Component } from 'react';
import { blogApis } from '../../features/blog';
export default class PostEdit extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                title: '', 
                content: '', 
                author: ''
            };
        }
        componentDidMount() {
            const id = this.props.match.params.id;
            blogApis.getPost(id).then((response) =>
                this.setState({
                    title: response.post.title, 
                    content: response.post.content, 
                    author: response.post.author
                })).catch((error) => {
                console.log(error);
            })
            
        }
        onChange = (name) => {
            return (e) =>
                    this.setState({
                        [name]: e.target.value
                    });
        }
        onSubmit = (e) => {
            e.preventDefault();
            const id = this.props.match.params.id;
            const obj = {
                title: this.state.title, 
                content: this.state.content, 
                author: this.state.author
            };
            blogApis.updatePost(id, obj).then((res) => {
                console.log(res);
                this.props.history.push('/index');
            })
        }
        onCancel = () => {
            this.props.history.push('/index');
        }
        render() {
            return  (
                    <div>
                        <h3 align="center">
                        Update Post</h3>
                    
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
                                <input type="submit" value="Update" className="btn btn-primary">
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
