import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Popup from '../popup/Popup';
import AddHeroForm from '../addHeroForm/AddHeroForm';
import UpdateHeroForm from '../updateHeroForm/UpdateHeroForm';
import AddFullButton from '../buttons/AddFullButton';
import EditButton from '../buttons/EditButton';
import CategoriesLinks from '../categoriesLinks/CategoriesLinks';
import { fetchNewHeroes } from '../../store/actions';
import './newHeroes.scss';

class NewHeroes extends Component {
  componentDidMount() {
    const { load } = this.props;
    load();
  }

  componentDidUpdate(prevProps) {
    const { heroesList, load } = this.props;
    if (prevProps.heroesList === heroesList) {
      load();
    }
  }

  render() {
    const { heroesList, loggedIn, isAdmin } = this.props;
    return (
      <div className="px-3 container-xl">
        <div className="header">
          <h1>Heroes</h1>
        </div>
        <div className="row mt-5">
          <CategoriesLinks />
          <div className="col-md-9">
            {loggedIn && isAdmin && (
              <Popup
                title="Create a Hero"
                BodyModal={AddHeroForm}
                ButtonModal={AddFullButton}
              />
            )}
            <div className="heroes-list row row-cols-1 row-cols-md-3">
              {heroesList &&
                heroesList.map(({ id, imgURL, name, description, acts }) => {
                  return (
                    <div className="col mb-4" key={id}>
                      <div className="card h-100">
                        {loggedIn && isAdmin && (
                          <Popup
                            title="Edit Hero"
                            BodyModal={UpdateHeroForm}
                            ButtonModal={EditButton}
                            data={{ id, imgURL, name, description, acts }}
                          />
                        )}
                        <div className="card-img-body border-bottom">
                          <Link to={`/heroes/${id}`}>
                            <img
                              src={imgURL}
                              className="card-img-top"
                              alt={name}
                            />
                          </Link>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">
                            <Link to={`/heroes/${id}`}>{name}</Link>
                          </h5>
                          <p className="card-text">{description}</p>
                        </div>
                        <div className="card-footer text-center">
                          <Link
                            to={`/heroes/${id}`}
                            className="btn btn-primary"
                          >
                            Book a hero
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    heroesList: state.heroes.heroesList,
    heroesTotal: state.heroes.heroesTotal,
    loggedIn: state.users.loggedIn,
    isAdmin: state.users.user.admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(fetchNewHeroes());
    },
  };
};

NewHeroes.defaultProps = {
  heroesList: [],
  match: {},
  loggedIn: false,
  isAdmin: false,
};

NewHeroes.propTypes = {
  heroesList: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
    }),
  }),
  load: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewHeroes);
