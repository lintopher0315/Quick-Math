import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: this.props.user,
        };
    }

    render() {
        return (
            <div className="home">
                {this.state.username !== "" ? (
                    <div className="show">
                        <Link to='/search'>
                            <Button bsStyle="primary">
                                Start
                            </Button>
                        </Link>
                        <Link to='/practice'>
                            <Button bsStyle="primary">
                                Practice
                            </Button>
                        </Link>
                    </div>
                ): (
                    "not logged in"
                )}
            </div>
        );
    }
}

export default Home;
