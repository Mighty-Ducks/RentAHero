import React, { Component } from 'react';
import './search.scss';

export default class Search extends Component {
  state = {
    input: '',
  };

  inputHandler = (event) => {
    if (event.target.value.length >= 3) {
      this.setState({ input: event.target.value });
    }
  };

  render() {
    const { input } = this.state;
    return (
      <form
        className="input-group input-group"
        id="header-search"
        action={`#/search/${input}/page/1`}
      >
        <input
          onChange={this.inputHandler}
          type="text"
          className="form-control"
          placeholder="Search a superhero"
          required
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit" id="button-search">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
    );
  }
}
