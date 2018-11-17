import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
