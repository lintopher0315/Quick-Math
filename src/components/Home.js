import React, { Component } from 'react';
import { Grid, Col, Button } from 'react-bootstrap';
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
                        <div className="start" style={styles.title}>
                            Get Started
                            <br />
                        </div>
                        <div className="button" style={styles.text}>
                            <Grid className="select" fluid={true}>
                                <Col xs={12} md={6}>
                                    <p>
                                        Compete against players online to complete a set of <br />math problems before they finish.
                                    </p>
                                    <Link to='/search'>
                                        <Button bsStyle="primary">
                                            Start
                                        </Button>
                                    </Link>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p>
                                        Practice a set of problems on your own to enhance <br />your speed and improve your stats.
                                    </p>
                                    <Link to='/practice'>
                                        <Button bsStyle="primary">
                                            Practice
                                        </Button>
                                    </Link>
                                </Col>
                            </Grid>
                        </div>
                    </div>
                ): (
                    <div>
                        <div className="title" style={styles.title}>
                            About
                            <br />

                        </div>
                        <div className="text" style={styles.text}>
                            <p>
                                Quick Math is a speed math website where users can challenge each other online to see who can solve arithmetic problems the fastest.
                            </p>
                            <br />
                            <p>
                                You can begin by signing up and logging in.
                            </p>
                            <br />
                            <br />
                            <br />
                            <br />
                            <p style={styles.source}>
                                github:
                            </p>
                             <a href="https://github.com/lintopher0315/Quick-Math">https://github.com/lintopher0315/Quick-Math</a>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

let styles = {
    title: {
        fontSize: 35,
        fontFamily: "Roboto Mono",
        paddingTop: 20,
        paddingBottom: 20,
    },
    text: {
        fontSize: 20,
        fontFamily: "Roboto Mono",
        background: "#fdfefe",
        paddingTop: 30,
    },
    source: {
        fontSize: 15,
        fontFamily: "Roboto Mono",
        background: "#fdfefe",
        color: '#b20e89',
    }
}

export default Home;
