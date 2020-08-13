import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser, deleteUser } from '../../store/actions';

class EditUserForm extends Component {
  constructor({ data }) {
    super();

    const { id, firstName, lastName, email, admin } = data;

    this.state = {
      id,
      firstName,
      lastName,
      email,
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
    const { post } = this.props;
    const { id, firstName, lastName, email, admin } = this.state;

    post(id, { firstName, lastName, email, admin });
  };

  deleteUser = (e) => {
    e.preventDefault();
    const { remove } = this.props;
    const { id } = this.state;

    remove(id);
  };

  render() {
    const { id, firstName, lastName, email, admin } = this.state;

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
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    post: (id, updatedUser) => {
      dispatch(updateUser(id, updatedUser));
    },
    remove: (id) => {
      dispatch(deleteUser(id));
    },
  };
};

EditUserForm.propTypes = {
  post: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
