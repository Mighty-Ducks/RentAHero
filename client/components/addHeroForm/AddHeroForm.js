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
    acts: [],
  };

  setFieldToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setActsToState = (e) => {
    const acts = [];
    const inputs = document.querySelectorAll('input[type=checkbox]');
    inputs.forEach((el) => {
      if (el.checked) acts.push(el.value);
    });
    this.setState({ [e.target.name]: acts });
  };

  createHero = async (e) => {
    e.preventDefault();
    const { post } = this.props;

    post(this.state);
  };

  render() {
    const { name, imgURL, description } = this.state;
    const { acts } = this.props;
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
              placeholder="Description"
              required
            />
          </label>
        </div>
        <div className="mb-3 pb-3 border-bottom">
          <h5 htmlFor="acts" className="label-full">
            Add Acts to Hero
          </h5>
          <div className="acts-container">
            {acts &&
              acts.map((act) => {
                return (
                  <div key={act.id} className="form-check">
                    <label
                      className="form-check-label d-flex justify-content-between"
                      htmlFor={`check-${act.id}`}
                    >
                      <input
                        className="form-check-input"
                        name="acts"
                        type="checkbox"
                        value={act.id}
                        id={`check-${act.id}`}
                        onChange={this.setActsToState}
                      />
                      {act.name}
                      <span className="space-dots"></span>
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="card-footer add-hero-footer text-center">
          <input
            type="submit"
            className="btn btn-primary"
            value="Create Hero"
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    acts: state.acts.actsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    post: (newHero) => {
      dispatch(postHero(newHero));
    },
  };
};

AddHeroForm.defaultProps = {
  acts: [],
};

AddHeroForm.propTypes = {
  acts: PropTypes.arrayOf(PropTypes.object),
  post: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddHeroForm);
