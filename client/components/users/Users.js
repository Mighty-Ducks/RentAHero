import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Popup from '../popup/Popup';
import EditUserForm from '../editUserForm/EditUserForm';
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
                            <Link to={`/users/${id}`}>
                              {firstName}
                              &nbsp;
                              {lastName}
                            </Link>
                          </h5>
                          <p className="card-text">
                            <span className="text-muted small">Email:</span>
                            &nbsp;
                            {email}
                          </p>
                          <p className="card-text">
                            <span className="text-muted small">
                              Registered:
                            </span>
                            &nbsp;
                            {new Date(createdAt).toDateString()}
                          </p>
                          <p className="card-text">
                            <span className="text-muted small">User type:</span>
                            &nbsp;
                            {admin ? (
                              <span className="text-success">Admin</span>
                            ) : (
                              <span className="text-info">Customer</span>
                            )}
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
