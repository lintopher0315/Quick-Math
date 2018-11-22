import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class AnsButton extends Component {
    render() {
        return (
            <div className="ansbutton" style={{marginBottom: 30}}>
                <Button bsStyle="info" bsSize="large" block onClick={() => this.props.handler(this.props.round + 1)}>{this.props.answer}</Button>
            </div>
        );
    }
}

export default AnsButton;
