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

    componentDidMount() {

    }

    render() {
        return (
            <div className="search">
                Waiting
                <Link to='/'>
                    <Button>
                        Return to Home
                    </Button>
                </Link>
            </div>
        );
    }
}

export default Search;
