import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: this.props.user,
            practiceScoreData: {
                labels: [],
                datasets: [{
                    data: [],
                    label: this.props.user,
                    borderColor: "#3e95cd",
                    fill: false,
                },]
            },
            playScoreData: {
                labels: [],
                datasets: [{
                    data: [],
                    label: this.props.user,
                    borderColor: "#f442f1",
                    fill: false
                },]
            },
            practiceTimeData: {
                labels: [],
                datasets: [{
                    data: [],
                    label: this.props.user,
                    borderColor: "#41f4bb",
                    fill: false
                },]
            },
            playTimeData: {
                labels: [],
                datasets: [{
                    data: [],
                    label: this.props.user,
                    borderColor: "#f4c741",
                    fill: false
                },]
            },
        };
    }

    componentDidMount() {
        var practiceScoreData = [];
        var practiceTimeData = [];
        fetch('/users/displaypractice', {
            method: 'POST',
            body: JSON.stringify({
                usr: this.state.username,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            practiceScoreData = Object.assign({}, this.state.practiceScoreData);
            for (var i = 0; i < json.length; i++) {
                if (i === 10) {
                    break;
                }
                practiceScoreData.datasets[0].data.push(json[i].score);
                practiceScoreData.labels.push(json[i].date.substring(0, 10));
            }

            practiceTimeData = Object.assign({}, this.state.practiceTimeData);
            for (i = 0; i < json.length; i++) {
                if (i === 10) {
                    break;
                }
                practiceTimeData.datasets[0].data.push(Math.round(json[i].time * 100) / 100);
                practiceTimeData.labels.push(json[i].date.substring(0, 10));
            }
        })

        fetch('/users/displayplay', {
            method: 'POST',
            body: JSON.stringify({
                usr: this.state.username,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            let playScoreData = Object.assign({}, this.state.playScoreData);
            for (var i = 0; i < json.length; i++) {
                if (i === 10) {
                    break;
                }
                playScoreData.datasets[0].data.push(json[i].score);
                playScoreData.labels.push(json[i].date.substring(0, 10));
            }

            let playTimeData = Object.assign({}, this.state.playTimeData);
            for (i = 0; i < json.length; i++) {
                if (i === 10) {
                    break;
                }
                playTimeData.datasets[0].data.push(Math.round(json[i].time * 100) / 100);
                playTimeData.labels.push(json[i].date.substring(0, 10));
            }
            this.setState({practiceScoreData: practiceScoreData, practiceTimeData: practiceTimeData, playScoreData: playScoreData, playTimeData: playTimeData});
        })
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
