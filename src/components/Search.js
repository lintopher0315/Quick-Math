import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: this.props.user,
        };
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

    componentDidMount() {
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
                console.log("currently waiting");
            }
        })
    }

    render() {
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
