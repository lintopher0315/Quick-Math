import React, { Component } from 'react';
import { Button, Form, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class SignUpForm extends Component {

    state = {
        redirect: false
    }

    sendUser() {
        fetch('/users', {
            method: 'POST',
            body: JSON.stringify({
                usr: this.textInput.value,
                pass: this.textInput2.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                this.setState({ redirect: true});
            }
        })
        .catch( () => {
            console.log("signup error");
        })
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/login'/>;
        }
        return (
            <Form horizontal componentClass="form">
                <FormGroup controlId="username" componentClass="u">
                    <Col componentClass={ControlLabel} sm={2} style={styles.div}>
                        Username:
                    </Col>
                    <Col sm={9}>
                        <FormControl type="username" placeholder="Username" inputRef={input => this.textInput = input}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="password" componentClass="p">
                    <Col componentClass={ControlLabel} sm={2} style={styles.div}>
                        Password:
                    </Col>
                    <Col sm={9}>
                        <FormControl type="password" placeholder="Password" inputRef={input => this.textInput2 = input}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={1} sm={10}>
                        <Button bsStyle="default" onClick={this.sendUser.bind(this)} id="sub">Sign Up</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

let styles = {
    div: {
        fontFamily: "Roboto Mono",
        fontSize: 25,
        marginTop: -10,
        color: '#2980b9',
    }
}

export default SignUpForm;
