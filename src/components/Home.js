import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import { Link, Switch, Route } from 'react-router-dom';

class Home extends Component {
    state ={users: []}

    componentDidMount() {
        fetch('/users')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }

    render() {
        return (
            <div className="home">
                <Link to='/quiz'>
                    <Button bsStyle="primary">
                        Start
                    </Button>
                </Link>

                <h1>Users</h1>
                {this.state.users.map(user =>
                    <div key={user.id}>{user.username}</div>
                )}
            </div>
        );
    }
}

export default Home;
