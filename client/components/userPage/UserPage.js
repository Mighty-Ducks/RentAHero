import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserOrders from '../userOrders/UserOrders';
import EditUserForm from '../editUserForm/EditUserForm';
import Popup from '../popup/Popup';
import EditUserButton from '../buttons/EditUserButton';
import { fetchUser } from '../../store/actions';

class UserPage extends Component {
  componentDidMount() {
    const {
      load,
      match: {
        params: { id },
      },
    } = this.props;

    load(id);
  }

  render() {
    const {
      user: {
        firstName,
        lastName,
        email,
        id,
        street,
        state,
        zip,
        admin,
      },
    } = this.props;
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
            <p className="card-text">
              <span className="text-muted small">Address:</span>
              &nbsp;
              {street}
              ,&nbsp;
              {state}
              &nbsp;
              {zip}
            </p>
          </div>
          <div className="card-footer text-center">
            <Popup
              title="Edit User"
              BodyModal={EditUserForm}
              ButtonModal={EditUserButton}
              data={{
                firstName,
                lastName,
                email,
                id,
                street,
                state,
                zip,
                admin,
              }}
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
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: (id) => {
      dispatch(fetchUser(id));
    },
  };
};

UserPage.defaultProps = {
  match: {},
};

UserPage.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  load: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
