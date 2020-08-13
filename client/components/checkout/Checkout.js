import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddressForm from '../addressForm/AddressForm';
import './checkout.scss';

class Checkout extends Component {
  render() {
    const { loggedIn } = this.props;
    return (
      loggedIn && (
        <div className="hero-view container-xl">
          <h1>Checkout</h1>
          <AddressForm />
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user.user,
    firstName: state.users.user.firstName,
    lastName: state.users.user.lastName,
    loggedIn: state.users.loggedIn,
  };
};

Checkout.defaultProps = {
  loggedIn: false,
  match: {},
};

Checkout.propTypes = {
  loggedIn: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default connect(mapStateToProps)(Checkout);
