import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './logo.scss';

export default class Logo extends Component {
  render() {
    return (
      <strong className="logo">
        <Link to="/">
          <i className="fas fa-mask"></i>
          <span>RentAHero</span>
        </Link>
      </strong>
    );
  }
}
