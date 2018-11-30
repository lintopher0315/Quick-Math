import React, { Component } from 'react';
import Question from './Question';
import AnsButton from './AnsButton';
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

    randomExclude(ans) {
        var n1 = Math.floor(Math.random() * 50);
        if (n1 >= ans) {
            n1++;
        }
        return n1;
    }

    randomAssign(ans) {
        var random = Math.floor(Math.random() * 4);
        switch(random) {
            case 0:
                this.setState({
                    b1: ans,
                    b2: this.randomExclude(ans),
                    b3: this.randomExclude(ans),
                    b4: this.randomExclude(ans)
                });
                break;
            case 1:
                this.setState({
                    b1: this.randomExclude(ans),
                    b2: ans,
                    b3: this.randomExclude(ans),
                    b4: this.randomExclude(ans)
                });
                break;
            case 2:
                this.setState({
                    b1: this.randomExclude(ans),
                    b2: this.randomExclude(ans),
                    b3: ans,
                    b4: this.randomExclude(ans)
                });
                break;
            case 3:
                this.setState({
                    b1: this.randomExclude(ans),
                    b2: this.randomExclude(ans),
                    b3: this.randomExclude(ans),
                    b4: ans
                });
                break;
            default:
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
            return <Redirect to={{
                    pathname: '/results',
                    state: { score: this.state.score }
                }}/>;
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
