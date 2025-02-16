import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentForm from '../paymentForm/PaymentForm';
import { fetchCart, updateCart } from '../../store/actions';

const stripePromise = loadStripe(
  'pk_test_51HF8kpFygF7AEgLO0ijlGurivMeNBBuveJnXnM41E8QeJtCdKLyhtc1MQxW36Phq5MElkfEATFDaDtAK0iCk5z3B00gYzEQqyY'
);

class ReviewOrder extends Component {
  state = {
    redirect: false,
  };

  componentDidMount() {
    const { load } = this.props;
    load();
  }

  handleClick = (e) => {
    e.preventDefault();
    const { cart, update } = this.props;
    this.setState({ redirect: true });

    update(cart[0].cartId);
  };

  render() {
    const {
      cart,
      location: { state },
    } = this.props;

    const { redirect } = this.state;
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: '/confirmation',
            orderId: cart[0].cartId,
          }}
        />
      );
    }

    return (
      <div className="container-xl review-order">
        <h1>Order Review</h1>
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Items</h2>
                {cart.map((item) => {
                  return (
                    <div key={item.id} className="card bg-light mb-3">
                      <div className="card-body">
                        <h3 className="card-text">{item.heroName}</h3>
                        <p className="card-text">
                          {`${item.actName}, ${moment(item.datetime).format(
                            'LLLL'
                          )}`}
                        </p>
                        <p className="card-text">{`$${item.price}`}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="card-body">
                <h5 className="card-title">Contact Information</h5>
                <p className="card-text">{state.name}</p>
                <p className="card-text">{state.street}</p>
                <p className="card-text">{`${state.state}, ${state.zip}`}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <Elements stripe={stripePromise}>
              <ElementsConsumer>
                {({ elements, stripe }) => (
                  <PaymentForm
                    elements={elements}
                    stripe={stripe}
                    {...this.props}
                  />
                )}
              </ElementsConsumer>
            </Elements>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(fetchCart());
    },
    update: (id) => {
      dispatch(updateCart(id));
    },
  };
};

ReviewOrder.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  load: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      name: PropTypes.string.isRequired,
      redirect: PropTypes.bool.isRequired,
      state: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewOrder);
