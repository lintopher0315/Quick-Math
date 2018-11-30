import React, { Component } from 'react';
import Question from './Question';
import AnsButton from './AnsButton';
import { Grid, Col } from 'react-bootstrap';

class QuizPage extends Component {

    constructor(props) {
        super(props);

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
            score: 0
        }
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
            default:
                break;
        }
    }

    componentDidMount() {
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
                <Question/>{this.state.opponent}

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
