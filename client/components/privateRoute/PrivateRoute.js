import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
  render() {
    const {
      component: Component,
      loggedIn,
      isAdmin,
      loading,
      ...rest
    } = this.props;

    const isAuth = !loggedIn && !isAdmin && !loading;

    return (
      <Route
        {...rest}
        render={(props) => (isAuth ? <>404</> : <Component {...props} />)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.users.loggedIn,
    isAdmin: state.users.user.admin,
    loading: state.users.loading,
  };
};

PrivateRoute.defaultProps = {
  loggedIn: false,
  isAdmin: false,
  loading: true,
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  loggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps)(PrivateRoute);
