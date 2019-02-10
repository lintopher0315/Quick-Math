import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Grid, Col, Button } from 'react-bootstrap';
import Login from './Login';
import QuizPage from './QuizPage';
import SignUp from './SignUp';
import Home from './Home';
import Practice from './Practice';
import Results from './Results';
import Search from './Search';
import QuizResults from './QuizResults';
import Profile from './Profile';

class Header extends Component {

    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this);

        this.state = {
            auth: false,
            username: ""
        };
    }

    handler(u, a) {
        this.setState({
            username: u,
            auth: a
        });
    }

    sendUser() {
        fetch('/users/auth', {
            method: 'POST',
            body: JSON.stringify({
                usr: this.state.username
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                this.setState({ auth: false, username: "" });
            }
        })
        .catch( () => {
            console.log("err");
        })
    }

    render() {
        return (
            <div className="head">
                <Grid className="header" fluid = {true} style = {styles.div}>

                    <Col xs={12} md={4} style={{textAlign: 'left',}}>
                        <div className="name">
                            {this.state.username !== "" ? (
                                <div className="left">
                                    <Link to='/' style={{marginRight: 35}}>
                                        <Button bsStyle="success" style={{fontFamily: 'sans-serif', fontSize: 14,}}>
                                            Home
                                        </Button>
                                    </Link>
                                    <Link to='/profile'>
                                        <Button bsStyle="default" style={{fontFamily: 'Roboto Mono', fontSize: 25,}}>
                                            {this.state.username}
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Link to='/' style={{marginRight: 35}}>
                                    <Button bsStyle="success" style={{fontFamily: 'sans-serif', fontSize: 14,}}>
                                        Home
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </Col>

                    <Col xs={12} md={4}>
                        <p style={styles.title}>Quick Math</p>
                    </Col>

                    <Col xs={12} md={4} style = {styles.button}>
                        {this.state.auth ? (
                            <Link to='/login'>
                                <Button bsStyle="primary" onClick={this.sendUser.bind(this)}>
                                    Logout
                                </Button>
                            </Link>
                        ) : (
                            <div className="form">
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
                            </div>
                        )}

                    </Col>
                </Grid>

                <Switch>
                    <Route exact path='/' component={() => <Home user={this.state.username}/>} />
                    <Route path='/login' component={() => <Login handler={this.handler}/>} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/quiz' component={QuizPage} />
                    <Route path='/practice' component={() => <Practice user={this.state.username}/>} />
                    <Route path='/results' component={Results} />
                    <Route path='/search' component={() => <Search user={this.state.username}/>} />
                    <Route path='/quizresults' component={QuizResults} />
                    <Route path='/profile' component={() => <Profile user={this.state.username}/>} />
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

    name: {
        fontFamily: 'Roboto Mono',
        fontSize: 20,
    },

    button: {
        textAlign: 'right',
    }
}

export default Header;
