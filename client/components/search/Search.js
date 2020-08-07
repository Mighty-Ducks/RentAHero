import React, { Component } from 'react';
import './search.scss';
import { Link } from 'react-router-dom';

export default class Search extends Component {
  state = {
    input: '',
  };

  inputHandler(event) {
    this.setState({ input: event.target.value });
  }

  render() {
    const { input } = this.state;
    return (
      <form className="input-group input-group" id="header-search">
        <input
          onChange={this.inputHandler.bind(this)}
          type="text"
          className="form-control"
          placeholder="Search a superhero "
        />
        <div className="input-group-append">
          <Link
            to={`/search/${input}/page/1`}
            className="btn btn-primary"
            type="button"
            id="button-search"
          >
            <i className="fas fa-search"></i>
          </Link>
        </div>
      </form>
    );
  }
}
