import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './banner.scss';

export default class Banner extends Component {
  state = {
    slogan: '',
    title: '',
    imgSrc: '',
    imgAlt: '',
    align: 'left',
  };

  componentDidMount() {
    const { slogan, title, imgSrc, imgAlt, align } = this.props;

    this.setState({ slogan, title, imgSrc, imgAlt, align });
  }

  render() {
    const { slogan, title, imgSrc, imgAlt, align } = this.state;

    return (
      <div className={`row banner banner-${align} border-bottom`}>
        <div className="banner-text col-md-6 d-flex flex-column align-items-center">
          <div className="banner-text-slogan">{slogan}</div>
          <h1>{title}</h1>
        </div>
        {imgSrc && (
          <img alt={imgAlt} src={imgSrc} className="img-fluid col-md-6" />
        )}
      </div>
    );
  }
}

Banner.defaultProps = {
  slogan: false,
  title: false,
  imgSrc: false,
  imgAlt: false,
  align: false,
};

Banner.propTypes = {
  slogan: PropTypes.string,
  title: PropTypes.string,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  align: PropTypes.string,
};
