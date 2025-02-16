import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class OrderConfirmation extends Component {
  render() {
    const {
      location: { orderId },
    } = this.props;

    return (
      <div className="container-xl review-order">
        <div className="jumbotron text-center">
          <h1 className="display-3">Thank You!</h1>
          <p className="lead">
            <strong>Your order is complete. </strong>
            {`your oredr number is ${orderId}.`}
          </p>
          <hr />
          <p className="lead">
            <Link className="btn btn-primary btn-primary" to="/">
              Continue to homepage
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

OrderConfirmation.propTypes = {
  location: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
  }).isRequired,
};
