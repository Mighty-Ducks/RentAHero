import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Popup from '../popup/Popup';
// import UpdateHeroForm from '../updateHeroForm/UpdateHeroForm';
// import EditButton from '../buttons/EditButton';
import { fetchUser } from '../../store/actions';
import './user.scss';

class User extends Component {
  state = {
    total: 0,
    actId: '',
    actName: '',
    actPrice: '',
  };

  componentDidMount() {
    // const { logIn } = this.props;

    // logIn();
    console.log(this.props);
  }

  componentDidUpdate(prevProps) {
    // const { logIn, loggedIn } = this.props;
    // if (prevProps !== this.props) {
    //   logIn();
    // }
  }

  render() {
    // const {
    //   hero: { id, name, imgURL, description, acts = [] },
    //   addToCart,
    //   loggedIn,
    //   isAdmin,
    // } = this.props;

    // const { total, actId, actName, actPrice } = this.state;

    return (
        <h1>Test</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hero: state.heroes.hero,
    loggedIn: state.users.loggedIn,
    isAdmin: state.users.user.admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // load: (id) => {
    //   dispatch(fetchHero(id));
    // },
    // addToCart: (ev, id, name, imgURL, actId, actName, actPrice, total) => {
    //   ev.preventDefault();
    //   const item = {
    //     heroId: id,
    //     heroName: name,
    //     heroImgURL: imgURL,
    //     actId,
    //     actName,
    //     price: actPrice,
    //     total,
    //   };

    // //   dispatch(createItem(item));
    // },
  };
};

// User.defaultProps = {
//   match: {},
//   loggedIn: false,
//   isAdmin: false,
// };

// User.propTypes = {
//   hero: PropTypes.oneOfType([PropTypes.object]).isRequired,
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string,
//     }),
//   }),
//   load: PropTypes.func.isRequired,
//   addToCart: PropTypes.func.isRequired,
//   loggedIn: PropTypes.bool,
//   isAdmin: PropTypes.bool,
// };

export default connect(mapStateToProps, mapDispatchToProps)(User);
