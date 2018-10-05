import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Question from './components/Question';
import { Grid, Col, Row, Button } from 'react-bootstrap';

class App extends Component {
    render() {
        return (
            <div className="App" style = {{background: '#e5e8e8'}}>
                <Header/>
                <Question/>

                <Grid className="questions" style = {styles.grid}>
                    <Col xs={12} md={6} style = {styles.question}>
                        <p>Answer 1</p>
                    </Col>

                    <Col xs={12} md={6} style = {styles.question}>
                        <p>Answer 2</p>
                    </Col>

                    <Col xs={6} md={6} style = {styles.question}>
                        <p>Answer 3</p>
                    </Col>

                    <Col xs={6} md={6} style = {styles.question}>
                        <p>Answer 4</p>
                    </Col>
                </Grid>
            </div>
        );
    }
}

let styles = {
    grid: {
        fontSize: 35,
        fontFamily: "sans-serif",
        background: '#f4f6f6',
        marginTop: 30,
        marginBottom: 30,
    },

    question: {
        outlineStyle: 'solid',
    }
}

export default App;
