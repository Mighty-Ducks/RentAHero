import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

export default class Header extends Component {
  render() {
    return (
      <header>
        <strong className="logo"><Link to="/"><i className="fas fa-mask"></i><span>RentAHero</span></Link></strong>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
          </ul>
        </nav>

        <div id="user-info">
          <ul>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/login">Sign In</Link>
            </li>
          </ul>
        </div>

      </header>
    )
  }
}
