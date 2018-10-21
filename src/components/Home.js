import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import { Link, Switch, Route } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="home">
                <Link to='/quiz'>
                    <Button bsStyle="primary">
                        Start
                    </Button>
                </Link>
            </div>
        );
    }
}

export default Home;
