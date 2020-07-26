import React, { Component } from 'react';
import { HashRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import '../../public/styles.scss';

import { Header } from './';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Header />
        <div className="p-5">
          <img src="../../public/assets/stormtrooper.png" height="400" />
        </div>
        <h1>Hello!</h1>
      </HashRouter>
    )
  }
}

export default App;
