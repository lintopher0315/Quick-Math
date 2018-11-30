import React, { Component } from 'react';
import { Button, Form, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {

    state = {
        redirect: false
    }

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
        .then(res => res.json())
        .then(json => {
            if (json.success){
                let temp = this.textInput.value;
                this.setState({ redirect: true });
                this.props.handler(temp, true);
            }
        })
        .catch( () =>{
            console.log("ERR");
        })
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/'/>;
        }
        return (
            <Form horizontal>
                <FormGroup controlId="username">
                    <Col componentClass={ControlLabel} sm={2} style={styles.div}>
                        Username:
                    </Col>
                    <Col sm={9}>
                        <FormControl type="username" placeholder="Username" inputRef={input => this.textInput = input}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={2} style={styles.div}>
                        Password:
                    </Col>
                    <Col sm={9}>
                        <FormControl type="password" placeholder="Password" inputRef={input => this.textInput2 = input}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={1} sm={10}>
                        <Button bsStyle="default" onClick={this.sendUser.bind(this)}>Submit</Button>
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

export default LoginForm;
