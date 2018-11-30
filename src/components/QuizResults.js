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
    }

    render() {
        return (
            <div className="quizresults">
                <div className="content">

                    Here are the results!
                    {"\n"}
                    {this.state.username}:{this.state.score}
                    {"\n"}
                    {this.state.opponent}:{this.state.opponentScore}
                    {"\n"}
                    Time: {this.state.time}

                </div>
                <Link to='/'>
                    <Button bsStyle="primary">
                        Home
                    </Button>
                </Link>
            </div>
        );
    }
}

export default QuizResults;
