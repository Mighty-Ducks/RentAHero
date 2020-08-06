import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postHero } from '../../store/actions';
import './AddHeroForm.scss';

class AddHeroForm extends Component {
  state = {
    name: '',
    imgURL: '',
    description: '',
  };

  setFieldToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createHero = async (e) => {
    e.preventDefault();
    const { post } = this.props;

    post(this.state);
  };

  render() {
    const { name, imgURL, description } = this.state;

    return (
      <form onSubmit={this.createHero} className="add-hero-form">
        <div className="form-group">
          <label htmlFor="name" className="label-full">
            Hero Name
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={this.setFieldToState}
              placeholder="Hero Name"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="imgURL" className="label-full">
            Hero Image
            <input
              type="text"
              className="form-control"
              name="imgURL"
              value={imgURL}
              onChange={this.setFieldToState}
              placeholder="Hero Image"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="description" className="label-full">
            Description
            <textarea
              className="form-control"
              name="description"
              value={description}
              onChange={this.setFieldToState}
              placeholder="description"
              required
            />
          </label>
        </div>
        <div className="card-footer add-hero-footer text-center">
          <input type="submit" className="btn btn-primary" value="Save" />
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    post: (newHero) => {
      dispatch(postHero(newHero));
    },
  };
};

AddHeroForm.propTypes = {
  post: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AddHeroForm);
