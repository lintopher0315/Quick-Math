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
            score: 0,
            seconds: 0,
            totSeconds: 0,
        }
    }

    tick() {
        this.setState(prevState => ({
            seconds: parseFloat((prevState.seconds + 0.1).toFixed(2))
        }));
    }

    handler(u, a) {
        this.setState({ totSeconds: this.state.totSeconds + this.state.seconds });
        this.setState({ seconds: 0 });
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

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 100)
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
                    state: { score: this.state.score , seconds: this.state.totSeconds }
                }}/>;
        }
        return (
            <div className="App" style = {{background: '#e5e8e8'}}>
                <Question ques={this.state.question} round={this.state.round}/>

                <Grid className="questions" style = {styles.grid}>
                    <Col xs={12} md={6}>
                        <AnsButton handler={this.handler} round={this.state.round} answer={this.state.b1}/>
                    </Col>

                    <Col xs={12} md={6}>
                        <AnsButton handler={this.handler} round={this.state.round} answer={this.state.b2}/>
                    </Col>

                    <Col xs={6} md={6}>
                        <AnsButton handler={this.handler} round={this.state.round} answer={this.state.b3}/>
                    </Col>

                    <Col xs={6} md={6}>
                        <AnsButton handler={this.handler} round={this.state.round} answer={this.state.b4}/>
                    </Col>
                </Grid>
                <br />
                <br />
                <Grid className="time">
                    <Col xs={12} md={6}>
                        <p style={styles.result}>
                            {(this.state.totSeconds).toFixed(2)}
                        </p>
                    </Col>

                    <Col xs={12} md={6}>
                        <p style={styles.result}>
                            {(this.state.seconds).toFixed(2)}
                        </p>
                    </Col>
                </Grid>
            </div>
        );
    }
}

let styles = {
    grid: {
        fontSize: 35,
        fontFamily: "Roboto Mono",
        marginTop: 30,
        marginBottom: 30,
    },

    result: {
        fontSize: 45,
        fontFamily: "Roboto Mono",
        paddingBottom: 30,
    }
}

export default Practice;
