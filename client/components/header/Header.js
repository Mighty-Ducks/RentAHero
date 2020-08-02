import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import Search from '../search/Search';
import Logo from '../logo/Logo';

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="border-bottom d-flex justify-content-between align-items-center py-2 pl-3">
          <Logo />
          <ul className="pr-1">
            <li>
              <Link to="/login">
                <i className="fas fa-user"></i>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="fas fa-shopping-bag"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="border-bottom d-flex justify-content-between align-items-center py-3">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/heroes">Heroes</Link>
              </li>
              <li>
                <Link to="/popular">Most Popular</Link>
              </li>
              <li>
                <Link to="/new">New</Link>
              </li>
            </ul>
          </nav>
          <div id="user-info" className="pr-3">
            <Search />
          </div>
        </div>
      </header>
    );
  }
}
