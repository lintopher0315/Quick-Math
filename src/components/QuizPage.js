import React, { Component } from 'react';
import Question from './Question';
import AnsButton from './AnsButton';
import Timer from './Timer';
import { Grid, Col, Row, Button } from 'react-bootstrap';

class QuizPage extends Component {
    render() {
        return (
            <div className="App" style = {{background: '#e5e8e8'}}>
                <Question/>

                <Grid className="questions" style = {styles.grid}>
                    <Col xs={12} md={6} style = {styles.question}>
                        <AnsButton/>
                    </Col>

                    <Col xs={12} md={6} style = {styles.question}>
                        <AnsButton/>
                    </Col>

                    <Col xs={6} md={6} style = {styles.question}>
                        <AnsButton/>
                    </Col>

                    <Col xs={6} md={6} style = {styles.question}>
                        <AnsButton/>
                    </Col>
                </Grid>
                <Timer/>
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

export default QuizPage;
