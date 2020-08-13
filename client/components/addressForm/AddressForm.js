import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './addressForm.scss';

class AddressForm extends Component {
  state = {
    redirect: false,
    name: '',
    street: '',
    state: '',
    zip: '',
  };

  componentDidMount() {
    const { firstName, lastName } = this.props;
    this.setState({ name: `${firstName} ${lastName}` });
  }

  setFieldToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ redirect: true });
  };

  render() {
    const { name, street, state, zip, redirect } = this.state;
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: '/review',
            state: this.state,
          }}
        />
      );
    }
    return (
      <div className="card p-5 col-md-6">
        <form onSubmit={this.handleChange} className="auth-form">
          <h2>Enter Shipping Address</h2>
          <div className="form-group">
            <label htmlFor="name" className="label-full">
              Name&nbsp;
              <input
                id="card-number"
                className="form-control"
                name="name"
                value={name}
                onChange={this.setFieldToState}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="street" className="label-full">
              Street Address&nbsp;
              <input
                id="card-number"
                className="form-control"
                name="street"
                value={street}
                onChange={this.setFieldToState}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="state" className="label-full">
              State
              <input
                className="form-control"
                name="state"
                value={state}
                onChange={this.setFieldToState}
                id="state"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="zip" className="label-full">
              Zip&nbsp;Code
              <input
                className="form-control"
                name="zip"
                value={zip}
                onChange={this.setFieldToState}
                id="zip"
                type="number"
                maxLength="5"
                required
              />
            </label>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn-primary">
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    );
  }
}

AddressForm.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    firstName: state.users.user.firstName,
    lastName: state.users.user.lastName,
  };
};

export default connect(mapStateToProps)(AddressForm);
