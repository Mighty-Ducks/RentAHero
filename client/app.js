import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../public/styles.scss';

import { Header, Home } from './components';
import { fetchHeroes } from './store/actions';

class App extends Component {
  componentDidMount() {
    const { load } = this.props;

    load();
  }

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

App.propTypes = {
  load: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(fetchHeroes());
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
