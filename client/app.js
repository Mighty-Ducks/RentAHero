import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../public/styles.scss';

import {
  Header,
  Home,
  Login,
  Register,
  Heroes,
  Hero,
  Cart,
} from './components';
import { fetchHeroes, fetchActs } from './store/actions';

class App extends Component {
  componentDidMount() {
    const { load } = this.props;

    load();
  }

  render() {
    return (
      <HashRouter>
        <Header />
        <div className="py-5">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/heroes" component={Heroes} />
            <Route exact path="/heroes/:id" component={Hero} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </div>
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
      dispatch(fetchActs());
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
