import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './buttons.scss';

export default class EditUserButton extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button type="button" className="btn btn-danger" onClick={onClick}>
        Edit Profile
      </button>
    );
  }
}

EditUserButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
