import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers } from '../../store/actions';

class Users extends Component {
  componentDidMount() {
    const { load } = this.props;

    load();
  }

  render() {
    const { usersList } = this.props;

    return (
      <div>
        {usersList.map((user) => {
          return (
            <div key={user.id}>
              {user.firstName}
              &nbsp;
              {user.lastName}
              <br />
              {user.email}
            </div>
          );
        })}
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
