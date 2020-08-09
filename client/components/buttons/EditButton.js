import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditButton extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button
        type="button"
        className="btn btn-danger edit-hero"
        onClick={onClick}
      >
        <i className="fas fa-pencil-alt"></i>
      </button>
    );
  }
}

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
