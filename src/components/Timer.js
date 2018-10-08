import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Col, Row, Button } from 'react-bootstrap';

class Timer extends Component {
    render() {
        var minutes = 0;
        var seconds = 0;
        var time = "";
        if (minutes.toString().length === 1) {
            time += "0";
        }
        time += minutes.toString() + ":";
        if (seconds.toString().length === 1) {
            time += "0";
        }
        time += seconds.toString();
        return (
            <div className="timer" style = {styles.div}>
                <p>{time}</p>
            </div>
        );
    }
}

let styles = {
    div: {
        fontFamily: "sans-serif",
        fontSize: 55,
        paddingBottom: 20,
    }
}

export default Timer;
