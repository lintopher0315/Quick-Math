import React, { Component } from 'react';

class Question extends Component {
    render() {
        return (
            <div className="question" style = {styles.div}>
                <p style = {styles.text}>Question</p>
                {this.props.ques}
            </div>
        );
    }
}

let styles = {
    div: {
        fontFamily: "sans-serif",
        fontSize: 40,
        marginTop: 40,
        background: '#f4f6f6',
    },

    text: {
        color: '#2980b9',
    }
}

export default Question;
