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
  SearchResults,
  Categories,
  CategoriesLinks,
} from './components';
import { fetchActs, logInWithSession } from './store/actions';

class App extends Component {
  componentDidMount() {
    const { load, logIn } = this.props;

    load();
    logIn();
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
            <Route exact path="/heroes/page/:page?" component={Heroes} />
            <Route exact path="/heroes/:id" component={Hero} />
            <Route
              exact
              path="/categories/:categoryName/page/:page?"
              component={Categories}
            />
            <Route exact path="/categories/:id" component={CategoriesLinks} />
            <Route exact path="/cart" component={Cart} />
            <Route
              exact
              path="/search/:term?/page/:page?"
              component={SearchResults}
            />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

App.propTypes = {
  load: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(fetchActs());
    },
    logIn: () => {
      dispatch(logInWithSession());
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
