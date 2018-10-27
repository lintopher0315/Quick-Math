import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Col } from 'react-bootstrap';

class SignUpForm extends Component {

    sendUser() {
        fetch('/users', {
            method: 'POST',
            body: JSON.stringify({
                usr: "username1",
                pass: "password2"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(function(response) {
            return response.json()
        }).then(function(body) {
            console.log(body);
        })
    }

    render() {
        return (
            <Form horizontal componentClass="form">
                <FormGroup controlId="username" componentClass="u">
                    <Col componentClass={ControlLabel} sm={2} style={styles.div}>
                        Username:
                    </Col>
                    <Col sm={10}>
                        <FormControl type="username" placeholder="Username"/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="password" componentClass="p">
                    <Col componentClass={ControlLabel} sm={2} style={styles.div}>
                        Password:
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder="Password"/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button bsStyle="default" onClick={this.sendUser} id="sub">Sign Up</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

let styles = {
    div: {
        fontFamily: "sans-serif",
        fontSize: 40,
        marginTop: 40,
        color: '#2980b9',
    }
}

export default SignUpForm;
