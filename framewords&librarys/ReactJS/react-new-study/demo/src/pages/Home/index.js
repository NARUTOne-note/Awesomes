import React, { Component } from 'react';
import logo from '@/assets/img/logo.svg';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <header className="home-body">
          <img src={logo} className="react-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="react-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default Home;