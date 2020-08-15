import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Search from '../search/Search';
import Logo from '../logo/Logo';
import { setLoggedOut } from '../../store/actions';
import './header.scss';

class Header extends Component {
  render() {
    const { loggedIn, logOut, id, firstName } = this.props;
    return (
      <header>
        <div className="border-bottom d-flex justify-content-between align-items-center py-2 pl-3">
          <Logo />
          <ul className="pr-1">
            <li>
              {loggedIn && (
                <>
                  Hi&nbsp;
                  <Link to={`/users/${id}`}>{firstName}</Link>
                </>
              )}
            </li>
            <li>
              {loggedIn ? (
                <Link to="/" onClick={() => logOut()}>
                  <i className="fas fa-sign-out-alt"></i>
                </Link>
              ) : (
                <Link to="/login">
                  <i className="fas fa-user"></i>
                </Link>
              )}
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
                <Link to="/heroes/page/1">Heroes</Link>
              </li>
              <li>
                <Link to="/popular">Most Popular</Link>
              </li>
              <li>
                <Link to="/heroes/new">New</Link>
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

const mapStateToProps = (state) => {
  return {
    loggedIn: state.users.loggedIn,
    id: state.users.me.id,
    firstName: state.users.me.firstName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch(setLoggedOut());
    },
  };
};

Header.defaultProps = {
  id: '',
  firstName: '',
};

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  id: PropTypes.string,
  firstName: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
