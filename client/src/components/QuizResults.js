import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class QuizResults extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: this.props.location.state.username,
            opponent: this.props.location.state.opponent,
            score: this.props.location.state.score,
            opponentScore: this.props.location.state.opponentScore,
            time: this.props.location.state.seconds,
            order: this.props.location.state.order,
            seconds: 0,
            opponentSeconds: this.props.location.state.opponentSeconds,
            done: false,
        }
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));

        fetch('/users/userfinish', {
            method: 'POST',
            body: JSON.stringify({
                usr: this.state.username,
                opponent: this.state.opponent,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                this.setState({ done: true });
            }
        })

        if (this.state.done && this.state.order === "first") {
            fetch('/users/removematch', {
                method: 'POST',
                body: JSON.stringify({
                    usr: this.state.username,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    console.log("removed match");
                }
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000)
        fetch('/users/exitmatch', {
            method: 'POST',
            body: JSON.stringify({
                usr: this.state.username,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                console.log("status: online");
            }
        })
        fetch('/users/playstatistic', {
            method: 'POST',
            body: JSON.stringify({
                usr: this.state.username,
                score: this.state.score,
                time: this.state.time,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                console.log("play statistic recorded");
            }
        })
    }

    render() {
        return (
            <div className="quizresults">
                <div className="content" style={styles.grid}>

                    Here are the results!
                    <br />
                    <br />
                    {this.state.username}
                    <br />
                    Score: {this.state.score}
                    <br />
                    Time: {this.state.time}
                    <br /><br />
                    {this.state.opponent}
                    <br />
                    Score: {this.state.opponentScore}
                    <br />
                    Time: {this.state.opponentSeconds}
                    <br />

                </div>
                <Link to='/'>
                    <Button bsStyle="primary" style = {{marginBottom: 20}}>
                        Home
                    </Button>
                </Link>
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
}

export default QuizResults;
