import React, { Component } from 'react';

class Question extends Component {
    render() {
        return (
            <div className="question" style = {styles.div}>
                <p style = {styles.text}>Question {this.props.round}</p>
                {this.props.ques}
            </div>
        );
    }
}

let styles = {
    div: {
        fontFamily: "Roboto Mono",
        fontSize: 45,
        marginTop: 40,
        paddingBottom: 20,
        background: '#f4f6f6',
    },

    text: {
        color: '#2980b9',
    }
}

export default Question;
