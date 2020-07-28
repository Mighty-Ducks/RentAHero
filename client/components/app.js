import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import '../../public/styles.scss';

import { Header, Home } from '.';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Header />
        <div className="p-5">
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
        <h1>Hello!</h1>
      </HashRouter>
    );
  }
}

export default App;
