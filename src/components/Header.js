import React, { Component } from 'react';


class Header extends Component {
    render() {
        return (
            <div className="header" style = {styles.div}>
                Quick Math
            </div>
        );
    }
}

let styles = {
    div:{
        background: 'blue',
        color: 'white',
    }
}

export default Header;
