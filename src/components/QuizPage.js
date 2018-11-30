import React, { Component } from 'react';
import Question from './Question';
import AnsButton from './AnsButton';
import { Grid, Col } from 'react-bootstrap';

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
            seconds: 0
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
        });
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
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
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
            if (this.state.order === "first") {
                var s = json[0].score2;
            }
            else if (this.state.order === "second") {
                var s = json[0].score1;
            }
            this.setState({ opponentScore: s });
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
                var q = json[0].username2;
            }
            else if (this.state.order === "second") {
                var q = json[0].username1;
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
        return (
            <div className="App" style = {{background: '#e5e8e8'}}>
                <Question ques={this.state.question}/>{this.state.round}{this.state.opponent}{this.state.opponentScore}

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

export default QuizPage;
