import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SignUpForm from './SignUpForm';

class SignUp extends Component {
    render() {
        return (
            <div className="signup-title" style = {styles.div}>
                <p style = {styles.text}>Sign Up</p>
                <SignUpForm/>
            </div>
        );
    }
}

let styles = {
    div: {
        fontFamly: "sans-serif",
        fontSize: 40,
        marginTop: 40,
        background: '#f4f6f6',
    },

    text: {
        color: '#2980b9',
    }
}

export default SignUp;
