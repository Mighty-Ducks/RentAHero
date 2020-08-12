import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Popup from '../popup/Popup';
import AddHeroForm from '../addHeroForm/AddHeroForm';
import EditUserButton from '../buttons/EditUserButton';
import { fetchUsers } from '../../store/actions';

class Users extends Component {
  componentDidMount() {
    const { load } = this.props;

    load();
  }

  render() {
    const { usersList } = this.props;

    return (
      <div className="px-3 container-xl">
        <div className="header">
          <h1>Users</h1>
        </div>
        <div className="mt-5">
          <div className="users-list row row-cols-1 row-cols-md-3">
            {usersList &&
              usersList.map(
                ({ id, firstName, lastName, email, createdAt, admin }) => {
                  return (
                    <div className="col mb-4" key={id}>
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">
                            {firstName}
                            &nbsp;
                            {lastName}
                          </h5>
                          <p className="card-text">{email}</p>
                          <p className="card-text">
                            <span className="text-muted">Registered:</span>
                            {createdAt}
                          </p>
                          <p className="card-text">
                            <span className="text-muted">User type:</span>
                            &nbsp;
                            {admin ? (
                              <span className="text-success">Admin</span>
                            ) : (
                              <span className="text-primary">Customer</span>
                            )}
                          </p>
                        </div>
                        <div className="card-footer text-center">
                          <Popup
                            title="Create a Hero"
                            BodyModal={AddHeroForm}
                            ButtonModal={EditUserButton}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersList: state.users.usersList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(fetchUsers());
    },
  };
};

Users.defaultProps = {
  usersList: [],
};

Users.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.object),
  load: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
