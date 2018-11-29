import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Home extends Component {

    render() {
        return (
            <div className="home">
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
        );
    }
}

export default Home;
