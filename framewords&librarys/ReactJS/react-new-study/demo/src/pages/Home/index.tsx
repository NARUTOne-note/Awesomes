import React, { Component } from 'react';
import logo from '@/assets/img/logo.svg';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <header className="home-body">
          <img src={logo} alt="Logo" className="react-logo"/>
          <p>
            Edit <code>src/xxx</code> and save to reload.
          </p>
          <a
            className="react-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more React
          </a>
        </header>
      </div>
    );
  }
}

export default Home;