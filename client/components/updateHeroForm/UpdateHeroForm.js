import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateHero, deleteHero } from '../../store/actions';
import './updateHeroForm.scss';

class AddHeroForm extends Component {
  constructor({ data }) {
    super();

    const { id, name, imgURL, description, acts } = data;

    this.state = {
      id,
      name,
      imgURL,
      description,
      updatedActs: acts.map((act) => act.id).flat(),
    };
  }

  setFieldToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setActsToState = (e) => {
    const { updatedActs } = this.state;
    const inputs = document.querySelectorAll('input[type=checkbox]');
    inputs.forEach((el) => {
      if (el.checked) updatedActs.push(el.value);
    });
    this.setState({ updatedActs: acts });
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
    const { acts } = this.props;
    const { name, imgURL, description } = this.state;

    return (
      <form className="add-hero-form">
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

AddHeroForm.defaultProps = {
  acts: [],
};

AddHeroForm.propTypes = {
  acts: PropTypes.arrayOf(PropTypes.object),
  post: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddHeroForm);
