import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Popup from '../popup/Popup';
import AddHeroForm from '../addHeroForm/AddHeroForm';
import UpdateHeroForm from '../updateHeroForm/UpdateHeroForm';
import AddFullButton from '../buttons/AddFullButton';
import EditButton from '../buttons/EditButton';
import Paginator from '../paginator/Paginator';
import CategoriesLinks from '../categoriesLinks/CategoriesLinks';
import { fetchHeroes } from '../../store/actions';
import './heroes.scss';

class Heroes extends Component {
  componentDidMount() {
    const {
      match: {
        params: { page },
      },
      load,
    } = this.props;
    load(page);
  }

  // because when a new page is clicked, props changes, but route and compoment remains the same
  // this is necessary to listen for change in props, to rerender component and fetch new page
  componentDidUpdate(prevProps) {
    const {
      heroesList,
      match: {
        params: { page },
      },
      load,
    } = this.props;
    if (prevProps.heroesList === heroesList) {
      load(page);
    }
  }

  render() {
    const {
      heroesList,
      heroesTotal,
      loggedIn,
      isAdmin,
      match: {
        params: { page },
      },
    } = this.props;
    const limit = 6;
    const pages = Array.from(
      {
        length: Math.ceil(heroesTotal / limit),
      },
      (v, i) => i + 1
    );
    const pageParams = {
      url: '/heroes',
    };
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
            <Paginator
              pages={pages || []}
              page={+page || 1}
              pageParams={pageParams}
            />
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
            <Paginator
              pages={pages || []}
              page={+page || 1}
              pageParams={pageParams}
            />
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
    load: (page) => {
      dispatch(fetchHeroes(page));
    },
  };
};

Heroes.defaultProps = {
  heroesList: [],
  match: {},
  loggedIn: false,
  isAdmin: false,
};

Heroes.propTypes = {
  heroesList: PropTypes.arrayOf(PropTypes.object),
  heroesTotal: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
    }),
  }),
  load: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Heroes);
