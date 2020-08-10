import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../public/styles.scss';

import {
  PrivateRoute,
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
  Users,
  UserPage,
} from './components';
import { fetchActs, logInWithSession } from './store/actions';

class App extends Component {
  componentDidMount() {
    const { load, logIn } = this.props;

    load();
    logIn();
  }

  render() {
    const { loggedIn } = this.props;
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
            <PrivateRoute exact path="/users" component={Users} />
            <Route exact path="/user/:id" component={UserPage} />
            <Route
              exact
              path="/user/:id"
              render={(props) => loggedIn && <UserPage {...props} />}
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

const mapStateToProps = (state) => {
  return {
    loggedIn: state.users.loggedIn,
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
