import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateHero, deleteHero } from '../../store/actions';

class EditUserForm extends Component {
  constructor({ data }) {
    super();

    const { id, firstName, lastName, email } = data;

    this.state = {
      id,
      firstName,
      lastName,
      email,
    };
  }

  setFieldToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateHero = async (e) => {
    e.preventDefault();
    const { post } = this.props;
    const { id, name, imgURL, description, acts } = this.state;

    post(id, { name, imgURL, description, acts });
  };

  deleteHero = (e) => {
    e.preventDefault();
    const { remove } = this.props;
    const { id } = this.state;

    remove(id);
  };

  render() {
    const { firstName, lastName, email } = this.state;

    return (
      <form className="add-hero-form">
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
        <div className="card-footer add-hero-footer text-center">
          <input
            type="button"
            className="btn btn-danger"
            value="Delete"
            onClick={this.deleteHero}
          />
          <input
            type="button"
            className="btn btn-success"
            value="Save"
            onClick={this.updateHero}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    acts: state.acts.actsList,
    hero: state.heroes.hero,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    post: (id, updatedHero) => {
      dispatch(updateHero(id, updatedHero));
    },
    remove: (id) => {
      dispatch(deleteHero(id));
    },
  };
};

EditUserForm.defaultProps = {
  acts: [],
};

EditUserForm.propTypes = {
  acts: PropTypes.arrayOf(PropTypes.object),
  post: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
