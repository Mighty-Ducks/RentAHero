import React, { Component } from 'react';
import AddressForm from '../addressForm/AddressForm';
import './checkout.scss';

class Checkout extends Component {
  render() {
    return (
      <div className="checkout-view container-xl">
        <div className="col-md-6 offset-md-3">
          <h1>Checkout</h1>
          <AddressForm />
        </div>
      </div>
    );
  }
}

export default Checkout;
