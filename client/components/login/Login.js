import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { setLoggedIn } from '../../store/actions';
import './login.scss';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
  };

  setFieldToState = (e) => {
    this.setState({ error: '' });
    this.setState({ [e.target.name]: e.target.value });
  };

  loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });

      if (data) {
        const { loggedIn, history } = this.props;

        loggedIn(true);
        history.push('/');
      }
    } catch (err) {
      // console.log(err.response);
      this.setState({ error: err.response.data.message });
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <div className="card p-5 col-md-6 m-auto">
        <form onSubmit={this.loginUser} className="auth-form">
          <h1>Login User</h1>
          <div className="form-group">
            <label htmlFor="email" className="label-full">
              Email address
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => this.setFieldToState(e)}
                placeholder="Email"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label-full">
              Password
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => this.setFieldToState(e)}
                id="inputPassword"
                required
              />
            </label>
          </div>
          {error && (
            <div className="alert alert-warning" role="alert">
              {error}
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <div>
              Don’t have an account?
              <Link to="/register">Register</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loggedIn: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    heroes: state.heroes,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loggedIn: async (flag) => {
      dispatch(setLoggedIn(flag));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
