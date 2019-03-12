import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Col } from 'react-bootstrap';

class LoginUsername extends Component {
    render() {
        return (
            <Form horizontal>
                <FormGroup controlId="username">
                    <Col componentClass={ControlLabel} sm={2}>
                        Username:
                    </Col>
                    <Col sm={10}>
                        <FormControl type="username" placeholder="Username" />
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default LoginUsername;
