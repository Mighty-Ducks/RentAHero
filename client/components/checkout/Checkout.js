import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cart from '../cart/Cart';
import './checkout.scss';

class Checkout extends Component {
  render() {
    const { firstName, lastName, user, loggedIn } = this.props;
    console.log(this.props);
    return (
      loggedIn && (
        <div className="hero-view container-xl">
          <h1>Checkout</h1>
          <ul>
            <h2>Shipping Address</h2>
            <li>
              &nbsp;
              {firstName}
              &nbsp;
              {lastName}
            </li>
            <li>
              &nbsp;
              {user}
            </li>
            <li>Address:&nbsp;</li>
            {/* <Popup
              title="Edit Hero"
              BodyModal={EditUserForm}
              ButtonModal={EditUserButton}
              data={{ firstName, lastName, user }}
            /> */}
          </ul>
          <Cart {...this.props} />
          <p>Order Total</p>
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
  user: '',
  firstName: '',
  lastName: '',
  loggedIn: false,
  match: {},
};

Checkout.propTypes = {
  user: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  loggedIn: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default connect(mapStateToProps)(Checkout);
