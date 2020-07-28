import React, { Component } from 'react';
import './search.scss';

export default class Search extends Component {
  render() {
    return (
      <form className="input-group input-group-sm" id="header-search">
        <input type="text" className="form-control" placeholder="Search" />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-search"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
    );
  }
}
