import React, { Component } from 'react';
import AddressForm from '../addressForm/AddressForm';
import './checkout.scss';

class Checkout extends Component {
  render() {
    return (
      <div className="hero-view container-xl">
        <h1>Checkout</h1>
        <AddressForm />
      </div>
    );
  }
}

export default Checkout;
