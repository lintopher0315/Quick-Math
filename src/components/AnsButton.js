import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Col, Row, Button } from 'react-bootstrap';

class AnsButton extends Component {
    render() {
        return (
            <div className="ansbutton" style={{marginBottom: 30}}>
                <Button bsStyle="info" bsSize="large" block>Answer Button</Button>
            </div>
        );
    }
}

export default AnsButton;
