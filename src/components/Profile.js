import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            practiceScoreData: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                datasets: [{
                    data: [20, 23, 24, 27, 35, 40, 26, 37, 34, 24],
                    label: "Username",
                    borderColor: "#3e95cd",
                    fill: false,
                },]
            },
            playScoreData: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                datasets: [{
                    data: [20, 23, 24, 27, 35, 40, 26, 37, 34, 24],
                    label: "Username",
                    borderColor: "#f442f1",
                    fill: false
                },]
            },
            practiceTimeData: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                datasets: [{
                    data: [20, 23, 24, 27, 35, 40, 26, 37, 34, 24],
                    label: "Username",
                    borderColor: "#41f4bb",
                    fill: false
                },]
            },
            playTimeData: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                datasets: [{
                    data: [20, 23, 24, 27, 35, 40, 26, 37, 34, 24],
                    label: "",
                    borderColor: "#f4c741",
                    fill: false
                },]
            },
        };
    }

    render() {
        return (
            <Grid className="stats" style = {styles.grid}>
                <Col xs={12} md={6}>
                    Practice
                    <div className="practiceScore">
                        <Line
                            data={this.state.practiceScoreData}
                            options={{
                                maintainAspectRatio: true,
                                title: {
                                    display: true,
                                    text: 'Score of Past 10 Matches',
                                    fontFamily: 'Roboto Mono',
                                },
                                scales: {
                                    xAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Last 10 Matches',
                                            fontFamily: 'Roboto Mono',
                                        }
                                    }],
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Score',
                                            fontFamily: 'Roboto Mono',
                                        }
                                    }]
                                }
                            }}
                        />
                    </div>
                </Col>

                <Col xs={12} md={6}>
                    Play
                    <div className="playScore">
                        <Line
                            data={this.state.playScoreData}
                            options={{
                                maintainAspectRatio: true,
                                title: {
                                    display:true,
                                    text: 'Score of Past 10 Matches',
                                    fontFamily: 'Roboto Mono',
                                },
                                scales: {
                                    xAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Last 10 Matches',
                                            fontFamily: 'Roboto Mono',
                                        }
                                    }],
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Score',
                                            fontFamily: 'Roboto Mono',
                                        }
                                    }]
                                }
                            }}
                        />
                    </div>
                </Col>

                <Col xs={8} md={6}>
                    <br />
                    <div className="practiceTime">
                        <Line
                            data={this.state.practiceTimeData}
                            options={{
                                maintainAspectRatio: true,
                                title: {
                                    display:true,
                                    text: 'Time of Past 10 Matches',
                                    fontFamily: 'Roboto Mono',
                                },
                                scales: {
                                    xAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Last 10 Matches',
                                            fontFamily: 'Roboto Mono',
                                        }
                                    }],
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Time (seconds)',
                                            fontFamily: 'Roboto Mono',
                                        }
                                    }]
                                }
                            }}
                        />
                    </div>
                </Col>

                <Col xs={8} md={6}>
                    <br />
                    <div className="playTime">
                        <Line
                            data={this.state.playTimeData}
                            options={{
                                maintainAspectRatio: true,
                                title: {
                                    display:true,
                                    text: 'Time of Past 10 Matches',
                                    fontFamily: 'Roboto Mono',
                                },
                                scales: {
                                    xAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Last 10 Matches',
                                            fontFamily: 'Roboto Mono',
                                        }
                                    }],
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Time (seconds)',
                                            fontFamily: 'Roboto Mono',
                                        }
                                    }]
                                }
                            }}
                        />
                    </div>
                </Col>
            </Grid>
        );
    }
}

let styles = {
    grid: {
        fontSize: 35,
        fontFamily: "Roboto Mono",
        marginTop: 30,
        marginBottom: 30,
    }
}

export default Profile;
