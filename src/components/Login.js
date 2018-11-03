import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import LoginForm from './LoginForm';

class Login extends Component {
    render() {
        return (
            <div className="login-title" style = {styles.div}>
                <p style = {styles.text}>Login</p>
                <LoginForm/>
            </div>
        );
    }
}

let styles = {
    div: {
        fontFamly: "Roboto Mono",
        fontSize: 40,
        marginTop: 40,
        background: '#f4f6f6',
    },

    text: {
        color: '#2980b9',
    }
}

export default Login;
