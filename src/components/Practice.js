import React, { Component } from 'react';
import Question from './Question';
import AnsButton from './AnsButton';
import Results from './Results';
import { Grid, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class Practice extends Component {

    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this);

        this.state = {
            round: 1,
            question: '',
            answer: '',
            b1: '',
            b2: '',
            b3: '',
            b4: '',
            score: 0
        }
    }

    handler(u, a) {
        if (a === this.state.answer) {
            this.setState({
                score: this.state.score + 5,
            });
        }
        this.setState({
            round: u,
        });
        fetch('/users/question')
        .then(res => res.json())
        .then(json => {
            console.log(json);
            var q = json.question;
            var a = json.answer;
            this.setState({ question: q, answer: a});
            this.randomAssign(this.state.answer);
        })
    }

    randomAssign(ans) {
        var random = Math.floor(Math.random() * 4);
        switch(random) {
            case 0:
                this.setState({
                    b1: ans,
                    b2: Math.floor(Math.random() * 50),
                    b3: Math.floor(Math.random() * 50),
                    b4: Math.floor(Math.random() * 50)
                });
                break;
            case 1:
                this.setState({
                    b1: Math.floor(Math.random() * 50),
                    b2: ans,
                    b3: Math.floor(Math.random() * 50),
                    b4: Math.floor(Math.random() * 50)
                });
                break;
            case 2:
                this.setState({
                    b1: Math.floor(Math.random() * 50),
                    b2: Math.floor(Math.random() * 50),
                    b3: ans,
                    b4: Math.floor(Math.random() * 50)
                });
                break;
            case 3:
                this.setState({
                    b1: Math.floor(Math.random() * 50),
                    b2: Math.floor(Math.random() * 50),
                    b3: Math.floor(Math.random() * 50),
                    b4: ans
                });
                break;
        }
    }

    componentDidMount() {
        fetch('/users/question')
        .then(res => res.json())
        .then(json => {
            console.log(json);
            var q = json.question;
            var a = json.answer;
            this.setState({ question: q, answer: a});
            this.randomAssign(this.state.answer);
        })
    }

    render() {
        var redirect = this.state.round;
        if (redirect === 11) {
            console.log("asdf");
            return <Redirect to='/results'/>;
        }
        return (
            <div className="App" style = {{background: '#e5e8e8'}}>
                <Question ques={this.state.question}/>{this.state.round}

                <Grid className="questions" style = {styles.grid}>
                    <Col xs={12} md={6} style = {styles.question}>
                        <AnsButton handler={this.handler} round={this.state.round} answer={this.state.b1}/>
                    </Col>

                    <Col xs={12} md={6} style = {styles.question}>
                        <AnsButton handler={this.handler} round={this.state.round} answer={this.state.b2}/>
                    </Col>

                    <Col xs={6} md={6} style = {styles.question}>
                        <AnsButton handler={this.handler} round={this.state.round} answer={this.state.b3}/>
                    </Col>

                    <Col xs={6} md={6} style = {styles.question}>
                        <AnsButton handler={this.handler} round={this.state.round} answer={this.state.b4}/>
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
        marginTop: 30,
        marginBottom: 30,
    },

    question: {

    }
}

export default Practice;