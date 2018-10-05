import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Col, Row, Button } from 'react-bootstrap';

//import {Columns} from 'react-columns';
//var Columns = require('react-columns');

class Header extends Component {
    render() {
        return (
            <Grid className="header" fluid = {true} style = {styles.div}>

                    <Col xs={12} md={4}>
                    </Col>
                    <Col xs={12} md={4}>
                        <p>Quick Math</p>
                    </Col>
                    <Col xs={12} md={4}>
                        <Button>ye</Button>
                    </Col>

            </Grid>
        );
    }
}

let styles = {
    div:{
        background: 'blue',
        color: 'white',
        fontSize: 60,

    }
}

export default Header;
