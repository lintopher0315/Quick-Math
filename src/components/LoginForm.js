import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Col } from 'react-bootstrap';

class LoginUsername extends Component {

    sendUser() {
        fetch('/users/check', {
            method: 'POST',
            body: JSON.stringify({
                usr: this.textInput.value,
                pass: this.textInput2.value
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
            <Form horizontal>
                <FormGroup controlId="username">
                    <Col componentClass={ControlLabel} sm={2} style={styles.div}>
                        Username:
                    </Col>
                    <Col sm={10}>
                        <FormControl type="username" placeholder="Username" inputRef={input => this.textInput = input}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={2} style={styles.div}>
                        Password:
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder="Password" inputRef={input => this.textInput2 = input}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button bsStyle="default" onClick={this.sendUser.bind(this)}>Submit</Button>
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

export default LoginUsername;
