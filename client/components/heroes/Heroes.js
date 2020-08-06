import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Popup from '../popup/Popup';
import AddHeroForm from '../addHeroForm/AddHeroForm';
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
    return (
      <div className="px-3">
        <div className="header">
          <h1>Heroes</h1>
          <nav className="pages">
            <ul className="pagination">
              <li className="page-item">
                <Link
                  className="page-link"
                  aria-label="Previous"
                  to={`/heroes/page/${page * 1 - 1 || 1}`}
                >
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              {pages.map((pg) => {
                return (
                  <li className="page-item" key={pg}>
                    <Link className="page-link" to={`/heroes/page/${pg}`}>
                      {pg}
                    </Link>
                  </li>
                );
              })}
              <li className="page-item">
                <Link
                  className="page-link"
                  aria-label="Next"
                  to={`/heroes/page/${
                    page * 1 + 1 >= pages.length ? pages.length : page * 1 + 1
                    }`}
                >
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="row mt-5">
          <div className="col-md-3">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="categories/female">Female</Link>
                <span className="badge badge-primary badge-pill">14</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="categories/male">Male</Link>
                <span className="badge badge-primary badge-pill">2</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="categories/pets">Human</Link>
                <span className="badge badge-primary badge-pill">1</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="categories/pets">Non-Human</Link>
                <span className="badge badge-primary badge-pill">1</span>
              </li>
            </ul>
          </div>
          <div className="col-md-9">
            <Popup
              title="Create a Hero"
              buttonText="Create"
              BodyModal={AddHeroForm}
            />
            {loggedIn && <>Logged</>}
            <div className="heroes-list row row-cols-1 row-cols-md-3">
              {heroesList &&
                heroesList.map(({ id, imgURL, name, description }) => {
                  return (
                    <div className="col mb-4" key={id}>
                      <div className="card h-100 ">
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Heroes);
