import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Col, Row, Button } from 'react-bootstrap';

//import {Columns} from 'react-columns';
//var Columns = require('react-columns');

class Header extends Component {
    render() {
        return (
            <Grid className="header" style = {styles.div}>

                <Col xs={12} md={4}>

                </Col>

                <Col xs={12} md={4}>
                    <p>Quick Math</p>
                </Col>

                <Col xs={12} md={4} style = {styles.button}>
                    <Button bsStyle="primary">Login</Button>
                </Col>

            </Grid>
        );
    }
}

let styles = {
    div: {
        background: '#1b2631',
        color: 'white',
        fontSize: 60,
        fontFamily: "sans-serif",
    },

    button: {
        textAlign: 'right',
    }
}

export default Header;
