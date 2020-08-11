// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// import { setLoggedIn } from '../../store/actions';
// import './editUserForm.scss';

// class EditUserForm extends Component {
//   state = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//   };

//   setFieldToState = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   render() {
//     const { firstName, lastName, email, password } = this.state;

//     return (
//       <div className="card p-5 col-md-6 m-auto">
//         <form onSubmit={this.registerUser} className="auth-form">
//           <h1>Edit Profile</h1>
//           <div className="form-group">
//             <label htmlFor="firstName" className="label-full">
//               First Name
//               <input
//                 type="firstName"
//                 className="form-control"
//                 name="firstName"
//                 value={firstName}
//                 onChange={(e) => this.setFieldToState(e)}
//                 placeholder="First Name"
//                 required
//               />
//             </label>
//           </div>
//           <div className="form-group">
//             <label htmlFor="LastName" className="label-full">
//               Last Name
//               <input
//                 type="LastName"
//                 className="form-control"
//                 name="lastName"
//                 value={lastName}
//                 onChange={(e) => this.setFieldToState(e)}
//                 placeholder="Last Name"
//                 required
//               />
//             </label>
//           </div>
//           <div className="form-group">
//             <label htmlFor="email" className="label-full">
//               Email address
//               <input
//                 type="email"
//                 className="form-control"
//                 name="email"
//                 value={email}
//                 onChange={(e) => this.setFieldToState(e)}
//                 placeholder="Email"
//                 required
//               />
//             </label>
//           </div>
//           <div className="form-group">
//             <label htmlFor="password" className="label-full">
//               Password
//               <input
//                 type="password"
//                 className="form-control"
//                 name="password"
//                 value={password}
//                 onChange={(e) => this.setFieldToState(e)}
//                 id="inputPassword"
//                 required
//               />
//             </label>
//           </div>
//           <div className="d-flex justify-content-between align-items-center">
//             <button type="submit" className="btn btn-primary">
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// EditUserForm.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loggedIn: async (flag) => {
//       dispatch(setLoggedIn(flag));
//     },
//   };
// };

// export default connect(null, mapDispatchToProps)(EditUserForm);
