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
              <Link to="/female">Female <i className="fas fa-venus"></i></Link>
            </li>
            <li>
              <Link to="/male">Male <i className="fas fa-mars"></i></Link>
            </li>
            <li>
              <Link to="/others">Others <i className="fas fa-pastafarianism"></i></Link>
            </li>
          </ul>
        </nav>


      </header>
    )
  }
}
