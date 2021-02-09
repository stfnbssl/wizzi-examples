/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\post\List.js.ittf
*/
'use strict';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { blogApis } from '../../features/blog';
export default class PostList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                posts: []
            };
        }
        componentDidMount() {
            blogApis.getPostList().then((response) =>
                this.setState({
                    posts: response.posts
                })).catch(function(error) {
                console.log(error);
            })
        }
        delete = (id) => {
            blogApis.deletePost(id).then(() => {
                console.log('Deleted');
            }).catch((err) => {
                console.log(err);
            })
        }
        render() {
            return  (
                    <div>
                        <h3 align="center">
                        Post List</h3>
                    
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>
                                    Title</th>
                                
                                    <th>
                                    Content</th>
                                
                                    <th>
                                    Author</th>
                                
                                    <th colSpan="2">
                                    Action</th>
                                
                                </tr>
                            
                            </thead>
                        
                            <tbody>
                            {
                                this.state.posts.map((obj, i) => {
                                    return  (
                                            <tr key={i}>
                                                <td>
                                                {obj.title}</td>
                                            
                                                <td>
                                                {obj.content}</td>
                                            
                                                <td>
                                                {obj.author}</td>
                                            
                                                <td>
                                                    <Link to={"/edit/" + obj._id} className="btn btn-primary">
                                                    Edit</Link>
                                                
                                                </td>
                                            
                                                <td>
                                                    <button onClick={()=>this.delete(obj._id)} className="btn btn-danger">
                                                    Delete</button>
                                                
                                                </td>
                                            
                                            </tr>
                                        )
                                    ;
                                })
                            }</tbody>
                        
                        </table>
                    
                    </div>
                )
            ;
        }
    }
