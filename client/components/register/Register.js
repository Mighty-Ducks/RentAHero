import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './register.scss';

export default class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    // isLogged: !!localStorage.getItem('token'),
  };

  setFieldToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerUser = async (e) => {
    e.preventDefault();

    // const { name, email, password } = this.state;
    // const { data } = await axios.post(`${API}/api/user`, { name, email, password });

    /*
    if (data) {
      localStorage.setItem('token', data.token);
      this.setState({ isLogged: true })
    }
    */
  };

  render() {
    const { name, email, password } = this.state;

    return (
      <div className="card p-5 col-md-6 m-auto">
        <form onSubmit={this.registerUser} className="auth-form">
          <h1>Register User</h1>
          <div className="form-group">
            <label htmlFor="name" className="label-full">
              Name
              <input
                type="name"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => this.setFieldToState(e)}
                placeholder="Name"
                required
              />
            </label>
          </div>
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
              Register
            </button>
            <div>
              Have an acccount?
              <Link to="/login">Login</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
