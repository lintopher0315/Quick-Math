import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Results extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="results">
                Here are the results!{this.props.location.state.score}
                <Link to='/'>
                    <Button bsStyle="primary">
                        Home
                    </Button>
                </Link>
            </div>
        );
    }
}

export default Results;
