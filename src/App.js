import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Question from './components/Question';
import AnsButton from './components/AnsButton';
import Timer from './components/Timer';
import Login from './components/Login';
import { Grid, Col, Row, Button } from 'react-bootstrap';

class App extends Component {
    render() {
        return (
            <div className="App" style = {{background: '#e5e8e8'}}>
                <Header/>
            </div>
        );
    }
}

let styles = {
    grid: {
        fontSize: 35,
        fontFamily: "sans-serif",
        marginTop: 30,
        marginBottom: 30,
    },

    question: {

    }
}

export default App;
