import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ScannerNavbar from "./components/ScannerNavbar/ScannerNavbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ScannerNavbar />
      </div>
    );
  }
}

export default App;
