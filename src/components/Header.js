import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Switch, Route } from 'react-router-dom';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import Login from './Login';
import QuizPage from './QuizPage';
import SignUp from './SignUp';
import Home from './Home';

class Header extends Component {
    render() {
        return (
            <div className="head">
                <Grid className="header" fluid = {true} style = {styles.div}>

                    <Col xs={12} md={4} style={{textAlign: 'left',}}>
                        <Link to='/'>
                            <Button bsStyle="success">
                                Home
                            </Button>
                        </Link>
                    </Col>

                    <Col xs={12} md={4}>
                        <p style={styles.title}>Quick Math</p>
                    </Col>

                    <Col xs={12} md={4} style = {styles.button}>
                        <Link to='/login'>
                            <Button bsStyle="primary">
                                Login
                            </Button>
                        </Link>
                        <Link to='/signup'>
                            <Button bsStyle="primary" style={{marginLeft: 10,}}>
                                Sign Up
                            </Button>
                        </Link>
                    </Col>

                </Grid>

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/quiz' component={QuizPage} />
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
        fontFamily: 'sans-serif',
    },

    title: {
        fontFamily: 'Roboto Mono',
    },

    button: {
        textAlign: 'right',
    }
}

export default Header;
