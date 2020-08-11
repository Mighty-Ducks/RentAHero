import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserOrders from '../userOrders/UserOrders';
import './userPage.scss';

class UserPage extends Component {
  render() {
    const { firstName, lastName, user } = this.props;
    return (
      <div className="hero-view container-xl">
        <h1>Profile Info</h1>
        <ul>
          <li>
            First Name:&nbsp;
            {firstName}
          </li>
          <li>
            Last Name:&nbsp;
            {lastName}
          </li>
          <li>
            Email:&nbsp;
            {user}
          </li>
        </ul>
        <UserOrders {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user.user,
    firstName: state.users.user.firstName,
    lastName: state.users.user.lastName,
  };
};

UserPage.defaultProps = {
  user: '',
  firstName: '',
  lastName: '',
  match: {},
};

UserPage.propTypes = {
  user: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default connect(mapStateToProps)(UserPage);
