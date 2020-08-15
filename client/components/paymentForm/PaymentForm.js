import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { postPayment } from '../../store/actions';

const stripePromise = loadStripe(
  'pk_test_51HF8kpFygF7AEgLO0ijlGurivMeNBBuveJnXnM41E8QeJtCdKLyhtc1MQxW36Phq5MElkfEATFDaDtAK0iCk5z3B00gYzEQqyY'
);

class PaymentForm extends Component {
  state = {
    confirmation: false,
  };

  handleSubmit = async (e) => {
    console.log(this.props);
    e.preventDefault();
    const { post } = this.props;

    this.setState({ confirmation: true });

    post({});
  };

  render() {
    const { confirmation } = this.state;
    const { cart } = this.props;
    const cartId = cart && cart.cart && cart.cart[0] ? cart.cart[0].cartId : '';

    if (confirmation) return <Redirect to="/confirmation" orderId={cartId} />;

    return (
      <div className="card">
        <form onSubmit={this.handleSubmit} className="auth-form">
          <Elements stripe={stripePromise}>
            <div className="card-body">
              <h2 className="card-title">Payment</h2>
              <div className="form-group">
                <label htmlFor="number" className="label-full">
                  Card Number
                  <CardNumberElement className="form-control" />
                </label>
              </div>
              <div className="form-row">
                <div className="form-group col-md-8">
                  <label htmlFor="month" className="label-full">
                    Expiration Date
                    <CardExpiryElement className="form-control" />
                  </label>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="cvv" className="label-full">
                    CVV2
                    <CardCvcElement className="form-control" />
                  </label>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <button type="submit" className="btn btn-primary">
                Proceed to Payment
              </button>
            </div>
          </Elements>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    post: (paymentInfo) => {
      dispatch(postPayment(paymentInfo));
    },
  };
};

PaymentForm.propTypes = {
  post: PropTypes.func.isRequired,
  cart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
