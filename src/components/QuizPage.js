import React, { Component } from 'react';
import Question from './Question';
import AnsButton from './AnsButton';
import { Grid, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class QuizPage extends Component {

    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this);

        this.state = {
            username: this.props.location.state.username,
            opponent: '',
            order: this.props.location.state.order,
            round: 1,
            question: '',
            answer: '',
            b1: '',
            b2: '',
            b3: '',
            b4: '',
            score: 0,
            opponentScore: 0,
            opponentQuestion: 1,
            seconds: 0,
            opponentSeconds: 0,
            running: true,
            opponentRunning: true
        }
    }

    handler(u, a) {
        if (a === this.state.answer) {
            this.setState({
                score: this.state.score + 5,
            }, () => {
                fetch('/users/updatescore', {
                    method: 'POST',
                    body: JSON.stringify({
                        usr: this.state.username,
                        order: this.state.order,
                        score: this.state.score,
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        console.log("score updated");
                    }
                })
            })
        }
        this.setState({
            round: u,
        }, () => {
            fetch('/users/incrementround', {
                method: 'POST',
                body: JSON.stringify({
                    usr: this.state.username,
                    order: this.state.order,
                    round: this.state.round,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    console.log("round updated");
                }
            })
        })
        fetch('/users/question')
        .then(res => res.json())
        .then(json => {
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

    tick() {
        if (this.state.round === 11) {
            this.setState({running: false});
        }
        if (this.state.opponentQuestion === 11) {
            this.setState({opponentRunning: false});
        }
        if (this.state.opponentRunning) {
            this.setState(prevState => ({
                opponentSeconds: prevState.opponentSeconds + 1
            }));
        }
        if (this.state.running) {
            this.setState(prevState => ({
                seconds: prevState.seconds + 1
            }));
        }
        fetch('/users/opponentscore', {
            method: 'POST',
            body: JSON.stringify({
                usr: this.state.username,
                order: this.state.order,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            var s = "";
            var r = "";
            if (this.state.order === "first") {
                s = json[0].score2;
                r = json[0].question2;
            }
            else if (this.state.order === "second") {
                s = json[0].score1;
                r = json[0].question1;
            }
            this.setState({ opponentScore: s, opponentQuestion: r });
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000)
        fetch('/users/getopponent', {
            method: 'POST',
            body: JSON.stringify({
                usr: this.state.username,
                order: this.state.order,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            var q = "";
            if (this.state.order === "first") {
                q = json[0].username2;
            }
            else if (this.state.order === "second") {
                q = json[0].username1;
            }
            this.setState({ opponent: q });
        })

        fetch('/users/question')
        .then(res => res.json())
        .then(json => {
            var q = json.question;
            var a = json.answer;
            this.setState({ question: q, answer: a});
            this.randomAssign(this.state.answer);
        })
    }

    render() {
        if (this.state.round === 11 && this.state.opponentQuestion >= 11) {
            return <Redirect to={{
                pathname: '/quizresults',
                state: {
                    username: this.state.username,
                    opponent: this.state.opponent,
                    score: this.state.score,
                    opponentScore: this.state.opponentScore,
                    seconds: this.state.seconds,
                    order: this.state.order,
                    opponentSeconds: this.state.opponentSeconds,
                }
            }}/>;
        }
        else if (this.state.round === 11) {
            return (
                <div className="done" style={styles.grid}>
                    <p>Waiting for opponent to finish.</p>
                </div>
            );
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
                <Grid className="score" style={styles.grid}>
                    <Col xs={12} md={6}>
                        <p style={styles.grid}>
                            {this.state.username}: {this.state.score}
                        </p>
                    </Col>
                    <Col xs={12} md={6}>
                        <p style={styles.grid}>
                            {this.state.opponent}: {this.state.opponentScore}
                        </p>
                    </Col>
                </Grid>
                <p style={styles.time}>
                    {this.state.seconds}
                </p>
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

    time: {
        fontSize: 45,
        fontFamily: "Roboto Mono",
        paddingBottom: 30,
    }
}

export default QuizPage;
