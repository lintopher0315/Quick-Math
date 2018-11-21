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
        }
    }

    handler(u) {
        this.setState({
            round: u,
        });
    }

    componentWillMount() {
        fetch('/users/question')
        .then(res => res.json())
        .then(json => {
            console.log(json);
            var q = json.question;
            var a = json.answer;
            this.setState({ question: q, answer: a});
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
                        <AnsButton handler={this.handler} round={this.state.round}/>
                    </Col>

                    <Col xs={12} md={6} style = {styles.question}>
                        <AnsButton handler={this.handler} round={this.state.round}/>
                    </Col>

                    <Col xs={6} md={6} style = {styles.question}>
                        <AnsButton handler={this.handler} round={this.state.round}/>
                    </Col>

                    <Col xs={6} md={6} style = {styles.question}>
                        <AnsButton handler={this.handler} round={this.state.round}/>
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
