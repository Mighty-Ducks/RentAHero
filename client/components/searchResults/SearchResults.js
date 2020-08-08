import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchHeroes } from '../../store/actions';
import Paginator from '../paginator/Paginator';

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
          <h1>
            Showing&nbsp;
            <strong>{searchTotal || 0}</strong>
            &nbsp;Results For&nbsp;
            <strong>
              &quot;
              {term}
              &quot;
            </strong>
          </h1>
          <Paginator pages={pages || []} page={+page || 1} />
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
