import React, { Component } from 'react';
import Question from './Question';
import AnsButton from './AnsButton';
import { Grid, Col } from 'react-bootstrap';

class Practice extends Component {

    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this);

        this.state = {
            round: 1,
        }
    }

    handler(u) {
        this.setState({
            round: u,
        });
    }

    render() {
        return (
            <div className="App" style = {{background: '#e5e8e8'}}>
                <Question/>{this.state.round}

                <Grid className="questions" style = {styles.grid}>
                    <Col xs={12} md={6} style = {styles.question}>
                        <AnsButton handler={this.handler} round={this.state.round}/>
                    </Col>

                    <Col xs={12} md={6} style = {styles.question}>
                        <AnsButton handler={this.handler} round={this.state.round}/>
                    </Col>

                    <Col xs={6} md={6} style = {styles.question}>
                        <AnsButton handler={this.handler} round={this.state.round}/>
                    </Col>

                    <Col xs={6} md={6} style = {styles.question}>
                        <AnsButton handler={this.handler} round={this.state.round}/>
                    </Col>
                </Grid>
            </div>
        );
    }
}

let styles = {
    grid: {
        fontSize: 35,
        fontFamily: "sans-serif",
        marginTop: 30,
        marginBottom: 30,
    },

    question: {

    }
}

export default Practice;
