import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

export default class Popup extends Component {
  state = {
    show: false,
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    const { show } = this.state;
    const { BodyModal, title } = this.props;
    const { handleClose, handleShow } = this;

    return (
      <>
        <button
          className="mb-3 p-3 w-100 d-flex justify-content-center align-items-center bg-light border border-dash"
          onClick={handleShow}
          type="button"
        >
          <i className="fas fa-plus-circle"></i>
        </button>
        <Modal show={show} onHide={handleClose} animation centered>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BodyModal />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

Popup.defaultProps = {
  title: '',
};

Popup.propTypes = {
  BodyModal: PropTypes.oneOfType([PropTypes.object]).isRequired,
  title: PropTypes.string,
};
