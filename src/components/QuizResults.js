import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class QuizResults extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="quizresults">
                <div className="content">

                    Here are the results!
                    {"\n"}
                    {this.props.location.state.username}:{this.props.location.state.score}
                    {"\n"}
                    {this.props.location.state.opponent}:{this.props.location.state.opponentScore}
                    {"\n"}
                    Time: {this.props.location.state.seconds}

                </div>
                <Link to='/'>
                    <Button bsStyle="primary">
                        Home
                    </Button>
                </Link>
            </div>
        );
    }
}

export default QuizResults;
