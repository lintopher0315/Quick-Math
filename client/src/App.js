import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';

class App extends Component {
    render() {
        return (
            <div className="App" style = {{background: '#e5e8e8'}}>
                <Header/>
            </div>
        );
    }
}

export default App;
