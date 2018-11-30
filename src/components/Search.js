import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: this.props.user,
            found: "",
            seconds: 0,
        };
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

    exitWaiting() {
        fetch('/users/stopwaiting', {
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
                console.log("exited waiting");
            }
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000)
        fetch('/users/waiting', {
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
                if (json.order === "first") {
                    this.setState({ found: "first" });
                }
                else if (json.order === "second") {
                    this.setState({ found: "second" });
                }
                console.log("currently waiting");
            }
        })
    }

    render() {
        if (this.state.found === "first") {
            fetch('/users/ingame', {
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
                console.log("asdf");
                if (json.success) {
                    console.log("1234");
                    this.setState({ found: "firstFin"});
                }
            })
        }
        else if (this.state.found === "second") {
            return <Redirect to={{
                pathname: '/quiz',
                state: { username: this.state.username, order: "second" }
            }}/>;
        }
        else if (this.state.found === "firstFin") {
            return <Redirect to={{
                pathname: '/quiz',
                state: { username: this.state.username, order: "first" }
            }}/>;
        }
        return (
            <div className="search">
                Waiting
                <Link to='/'>
                    <Button onClick={this.exitWaiting.bind(this)}>
                        Return to Home
                    </Button>
                </Link>
            </div>
        );
    }
}

export default Search;
