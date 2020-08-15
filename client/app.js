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
  Checkout,
  ReviewOrder,
  OrderConfirmation,
  NewHeroes,
  Page404,
} from './components';
import { fetchActs, logInWithSession } from './store/actions';

class App extends Component {
  componentDidMount() {
    const { load, logIn } = this.props;

    load();
    logIn();
  }

  componentDidUpdate() {
    const { logIn } = this.props;
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
            <Route exact path="/heroes/new" component={NewHeroes} />
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
            <Route exact path="/review" component={ReviewOrder} />
            <Route exact path="/confirmation" component={OrderConfirmation} />
            <Route exact path="/checkout" component={Checkout} />
            <PrivateRoute exact path="/users" component={Users} />
            <PrivateRoute exact path="/users/:id" component={UserPage} />
            <Route component={Page404} />
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
