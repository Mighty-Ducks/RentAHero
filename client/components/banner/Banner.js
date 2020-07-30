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

    console.log(this.state);

    return (
      <div className={`banner banner-${align} border-bottom`}>
        <div className="banner-text">
          <h2>{slogan}</h2>
          <br />
          <h1>{title}</h1>
        </div>
        {imgSrc && <img alt={imgAlt} src={imgSrc} />}
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
