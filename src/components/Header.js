import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Switch, Route } from 'react-router-dom';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import Login from './Login';
import QuizPage from './QuizPage';


//import {Columns} from 'react-columns';
//var Columns = require('react-columns');

class Header extends Component {
    render() {
        return (
            <div className="head">
                <Grid className="header" fluid = {true} style = {styles.div}>

                    <Col xs={12} md={4}>

                    </Col>

                    <Col xs={12} md={4}>
                        <p>Quick Math</p>
                    </Col>

                    <Col xs={12} md={4} style = {styles.button}>
                        <Link to='/login'>
                            <Button bsStyle="primary">
                                Login
                            </Button>
                        </Link>
                    </Col>

                </Grid>

                <Switch>
                    <Route exact path='/' component={QuizPage} />
                    <Route path='/login' component={Login} />
                </Switch>
            </div>
        );
    }
}

let styles = {
    div: {
        paddingTop: 10,
        background: '#24292e',
        color: 'white',
        fontSize: 60,
        fontFamily: "sans-serif",
    },

    button: {
        textAlign: 'right',
    }
}

export default Header;
