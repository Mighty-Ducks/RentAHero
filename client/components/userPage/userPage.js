import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserOrders from '../userOrders/UserOrders';
import EditUserForm from '../editUserForm/EditUserForm';
import Popup from '../popup/Popup';
import EditUserButton from '../buttons/EditUserButton';
import './userPage.scss';

class UserPage extends Component {
  render() {
    const { firstName, lastName, user } = this.props;
    return (
      <div className="hero-view container-xl">
        <h1>Profile Info</h1>
        <ul>
          <li>
            Name:&nbsp;
            {firstName}
            &nbsp;
            {lastName}
          </li>
          <li>
            Email:&nbsp;
            {user}
          </li>
          <li>
            Address:&nbsp;
            {/* {address} */}
          </li>
          <Popup
            title="Edit Hero"
            BodyModal={EditUserForm}
            ButtonModal={EditUserButton}
            data={{ firstName, lastName, user }}
          />
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
