import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './searchResults.scss';
import { searchHeroes } from '../../store/actions';

class SearchResults extends Component {
  componentDidMount() {
    const {
      match: {
        params: { term, page },
      },
      load,
    } = this.props;
    load(term, page);
  }

  componentDidUpdate(prevProps) {
    const {
      searchResults,
      match: {
        params: { term, page },
      },
      load,
    } = this.props;
    if (prevProps.searchResults === searchResults) {
      load(term, page);
    }
  }

  render() {
    const {
      searchResults,
      searchTotal,
      match: {
        params: { term, page },
      },
    } = this.props;
    const limit = 12;
    const pages = Array.from(
      {
        length: Math.ceil(searchTotal / limit),
      },
      (v, i) => i + 1
    );
    return (
      <div className="px-3">
        <div className="header">
          <h1>{`Showing ${searchTotal || 0} Results For "${term}"`}</h1>
          <nav className="pages">
            <ul className="pagination">
              <li className="page-item">
                <Link
                  className="page-link"
                  aria-label="Previous"
                  to={`/search/${term}/page/${page * 1 - 1 || 1}`}
                >
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              {pages.map((pg) => {
                return (
                  <li className="page-item" key={pg}>
                    <Link
                      className="page-link"
                      to={`/search/${term}/page/${pg}`}
                    >
                      {pg}
                    </Link>
                  </li>
                );
              })}
              <li className="page-item">
                <Link
                  className="page-link"
                  aria-label="Next"
                  to={`/search/${term}/page/${
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
                <Link to="categories/pets">Pets</Link>
                <span className="badge badge-primary badge-pill">1</span>
              </li>
            </ul>
          </div>
          <div className="col-md-9">
            <div className="heroes-list row row-cols-1 row-cols-md-3">
              {searchResults &&
                searchResults.map(({ id, imgURL, name, description }) => {
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
    searchResults: state.searchResults.heroes,
    searchTotal: state.searchResults.heroesTotal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: (term, page) => {
      dispatch(searchHeroes(term, page));
    },
  };
};

SearchResults.defaultProps = {
  searchResults: [],
  match: {},
};

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object),
  searchTotal: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
      term: PropTypes.string,
    }),
  }),
  load: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
