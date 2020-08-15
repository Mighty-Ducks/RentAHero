import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postUser } from '../../store/actions';
import './login.scss';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  setFieldToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = (e) => {
    e.preventDefault();

    const { logIn, history } = this.props;
    const { email, password } = this.state;

    logIn(email, password, true).then((res) => {
      if (res) {
        history.push('/');
      }
    });
  };

  render() {
    const { handleChange } = this;
    const { email, password } = this.state;
    const { error } = this.props;

    return (
      <div className="card p-5 col-md-6 m-auto">
        <form onSubmit={handleChange} className="auth-form">
          <h1>Login User</h1>
          <div className="form-group">
            <label htmlFor="email" className="label-full">
              Email address
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={this.setFieldToState}
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
                onChange={this.setFieldToState}
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

Login.defaultProps = {
  error: '',
};

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  error: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    heroes: state.heroes,
    users: state.users,
    error: state.users.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (email, password, flag) => dispatch(postUser(email, password, flag)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
