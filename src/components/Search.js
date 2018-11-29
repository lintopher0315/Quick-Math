import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Search extends Component {

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
