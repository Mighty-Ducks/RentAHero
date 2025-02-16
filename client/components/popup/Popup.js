import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import './popup.scss';

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
    const { BodyModal, ButtonModal, title, data } = this.props;
    const { handleClose, handleShow } = this;

    return (
      <>
        {ButtonModal && <ButtonModal onClick={handleShow} />}
        <Modal show={show} onHide={handleClose} animation centered>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BodyModal data={data} />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

Popup.defaultProps = {
  title: '',
  data: {},
  BodyModal: null,
  ButtonModal: null,
};

Popup.propTypes = {
  BodyModal: PropTypes.oneOfType([PropTypes.object]),
  ButtonModal: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  title: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.object]),
};
