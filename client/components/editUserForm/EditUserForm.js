import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser, deleteUser } from '../../store/actions';

class EditUserForm extends Component {
  constructor({ data }) {
    super();

    const { id, firstName, lastName, email, street, state, zip, admin } = data;

    this.state = {
      id,
      firstName,
      lastName,
      email,
      street,
      state,
      zip,
      admin,
    };
  }

  setFieldToState = ({ target: { name, value, checked, type } }) => {
    if (type === 'checkbox') {
      this.setState({ [name]: checked });
    } else {
      this.setState({ [name]: value });
    }
  };

  updateUser = async (e) => {
    e.preventDefault();
    const { me, post } = this.props;
    const {
      id,
      firstName,
      lastName,
      email,
      street,
      state,
      zip,
      admin,
    } = this.state;

    post(id, { firstName, lastName, email, street, state, zip, admin }, me);
  };

  deleteUser = (e) => {
    e.preventDefault();
    const { remove } = this.props;
    const { id } = this.state;

    remove(id);
  };

  render() {
    const {
      id,
      firstName,
      lastName,
      email,
      street,
      state,
      zip,
      admin,
    } = this.state;

    return (
      <form className="add-user-form">
        <div className="form-group">
          <label htmlFor="firstName" className="label-full">
            First Name
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={firstName}
              onChange={this.setFieldToState}
              placeholder="First Name"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="label-full">
            Last Name
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={lastName}
              onChange={this.setFieldToState}
              placeholder="Last Name"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="description" className="label-full">
            Email
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={this.setFieldToState}
              placeholder="Email"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="description" className="label-full">
            Street
            <input
              type="text"
              className="form-control"
              name="street"
              value={street}
              onChange={this.setFieldToState}
              placeholder="Street"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="description" className="label-full">
            State
            <input
              type="text"
              className="form-control"
              name="state"
              value={state}
              onChange={this.setFieldToState}
              placeholder="State"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="description" className="label-full">
            Zip
            <input
              type="text"
              className="form-control"
              name="zip"
              value={zip}
              onChange={this.setFieldToState}
              placeholder="Zip"
              required
            />
          </label>
        </div>
        <div className="form-group form-check">
          <label
            className="form-check-label d-flex justify-content-between"
            htmlFor={id}
          >
            is Admin
            <input
              className="form-check-input"
              name="admin"
              type="checkbox"
              id={id}
              checked={admin}
              onChange={this.setFieldToState}
            />
          </label>
        </div>
        <div className="card-footer add-user-footer text-center">
          <input
            type="button"
            className="btn btn-danger"
            value="Delete"
            onClick={this.deleteUser}
          />
          <input
            type="button"
            className="btn btn-success"
            value="Save"
            onClick={this.updateUser}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    me: state.users.me,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    post: (id, updatedUser, me) => {
      dispatch(updateUser(id, updatedUser, me));
    },
    remove: (id) => {
      dispatch(deleteUser(id));
    },
  };
};

EditUserForm.propTypes = {
  post: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  me: PropTypes.oneOfType([PropTypes.object]).isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
