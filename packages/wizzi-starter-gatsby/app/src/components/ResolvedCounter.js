/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-gatsby\.wizzi\src\components\ResolvedCounter.js.ittf
*/
'use strict';
import React from "react";
import PropTypes from "prop-types";
const counterStyle = {
    display: `flex`, 
    flexFlow: `row nowrap`, 
    alignItems: `center`, 
    padding: `0.2em 0.4em`, 
    borderRadius: `2px`, 
    backgroundColor: `rgba(0, 0, 0, 0.2)`, 
    boxShadow: `inset 2px 1.5px 4px rgba(0, 0, 0, 0.2)`
};
class Counter extends React.Component {
    state = {
        value: Number(this.props.initialvalue)
    };
    handleIncrement = () => {
        this.setState((state) => {
            return {
                    value: state.value + 1
                };
        });
    }
    handleDecrement = () => {
        this.setState((state) => {
            return {
                    value: state.value - 1
                };
        });
    }
    render() {
        return  (
                <span style={counterStyle}>
                    <strong style={{
                        flex: "1 1"
                    }}>
                    {this.state.value}</strong>
                
                    <button onClick={this.handleDecrement}>
                    -1</button>
                
                    <button onClick={this.handleIncrement}>
                    +1</button>
                
                </span>
            )
        ;
    }
}

Counter.propTypes = {
    initialvalue: PropTypes.number
}

Counter.defaultProps  = {
    initialvalue: 0
}
export default Counter;
