import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.scss';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    // isLogged: !!localStorage.getItem('token'),
  };

  setFieldToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginUser = async (e) => {
    e.preventDefault();

    // const { email, password } = this.state;
    // const { data } = await axios.post(`${API}/api/auth`, { email, password });

    /*
    if (data) {
      localStorage.setItem('token', data.token);
      this.setState({ isLogged: true })
    }
    */
  };

  render() {
    const { email, password } = this.state;

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
