import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Results extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: this.props.location.state.username,
            score: this.props.location.state.score,
            time: this.props.location.state.seconds,
        }
    }

    componentDidMount() {
        fetch('/users/practicestatistic', {
            method: 'POST',
            body: JSON.stringify({
                usr: this.state.username,
                score: this.state.score,
                time: this.state.time,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                console.log("statistic added");
            }
        })
    }

    render() {
        return (
            <div className="results">
                <p style={styles.grid}>
                    Score: {this.state.score}
                    <br />
                    Time: {this.state.time.toFixed(2)}
                </p>
                <Link to='/'>
                    <Button bsStyle="primary">
                        Home
                    </Button>
                </Link>
            </div>
        );
    }
}

let styles = {
    grid: {
        fontSize: 35,
        fontFamily: "sans-serif",
        marginTop: 30,
        marginBottom: 30,
    },
}

export default Results;
