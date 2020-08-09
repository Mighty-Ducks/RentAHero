import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './buttons.scss';

export default class AddFullButton extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button
        className="mb-3 p-3 w-100 d-flex justify-content-center align-items-center bg-light border border-dash"
        type="button"
        onClick={onClick}
      >
        <i className="fas fa-plus-circle"></i>
      </button>
    );
  }
}

AddFullButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
