/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\src\layouts\DefaultLayout.js.ittf
*/
'use strict';
import React from "react";
import { StyleSheet, css } from 'aphrodite';
import Link from "gatsby-link";
import { rhythm } from "../utils/typography";
import "./index.css";
export default ({ children, data }) => {
    console.log('data', data);
    const linkStyle = css(styles.link);
    return  (
            <div>
                <div className={css(styles.container)}>
                    <Link to={`/`}>
                        <h3 className={css(styles.linkTitle)}>
                        </h3>
                    
                    </Link>
                
                    <Link className={linkStyle} to={`/about/`}>
                    About</Link>
                
                    <Link className={linkStyle} to={`/projects/`}>
                    Projects</Link>
                
                    <Link className={linkStyle} to={`/blog/`}>
                    Blog</Link>
                
                </div>
            
            { children }</div>
        )
    ;
}
const styles = StyleSheet.create({
    link: {
        float: `right`, 
        paddingLeft: `10px`
    }, 
    linkTitle: {
        marginBottom: rhythm(2), 
        display: `inline-block`
    }, 
    container: {
        float: `right`, 
        paddingLeft: `10px`, 
        margin: `0 auto`, 
        maxWidth: 1000, 
        padding: rhythm(2), 
        paddingTop: rhythm(1.5)
    }
});
