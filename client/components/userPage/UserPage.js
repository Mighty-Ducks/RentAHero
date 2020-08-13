import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserOrders from '../userOrders/UserOrders';
import EditUserForm from '../editUserForm/EditUserForm';
import Popup from '../popup/Popup';
import EditUserButton from '../buttons/EditUserButton';

class UserPage extends Component {
  // componentDidUpdate(prev) {
  //   const { admin, email, id, firstName, lastName } = this.props;
  //   const user = { admin, email, id, firstName, lastName };
  //   const keys = Object.keys(prev);
  //   console.log(this.props);
  //   console.log(keys);

  //   keys.forEach((key) => {
  //     console.log(prev[key], user[key]);
  //     if (prev[key] !== user[key]) {
  //       fetchUser(id);
  //     }
  //     console.log(this.props);
  //   });
  // }

  render() {
    const { firstName, lastName, email, id, admin } = this.props;
    return (
      <div className="hero-view container-xl">
        <h1>Profile Info</h1>
        <div className="card mb-3">
          <div className="card-body">
            <h2 className="card-title">
              {firstName}
              &nbsp;
              {lastName}
            </h2>
            <p className="card-text">
              <span className="text-muted small">Email:</span>
              &nbsp;
              {email}
            </p>
          </div>
          <div className="card-footer text-center">
            <Popup
              title="Edit User"
              BodyModal={EditUserForm}
              ButtonModal={EditUserButton}
              data={{ firstName, lastName, email, id, admin }}
            />
          </div>
        </div>
        <UserOrders {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.users.user.email,
    firstName: state.users.user.firstName,
    lastName: state.users.user.lastName,
    id: state.users.user.id,
    admin: state.users.user.admin,
  };
};

UserPage.defaultProps = {
  email: '',
  firstName: '',
  lastName: '',
  match: {},
  id: '',
  admin: false,
};

UserPage.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  id: PropTypes.string,
  admin: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default connect(mapStateToProps)(UserPage);
