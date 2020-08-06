import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './heroes.scss';
import { fetchHeroes } from '../../store/actions';

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

  // because when a new page is clicked, props changes.
  // this is necessary to listen for change in props, so the component rerenders
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
      heroesList: { count },
      match: {
        params: { page },
      },
    } = this.props;
    const limit = 12;
    const pages = Array.from(
      {
        length: heroesList && Math.ceil(count / limit),
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
                  to={`/heroes/page/${page * 1 + 1 || pages.length}`}
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
              {heroesList.heroes &&
                heroesList.heroes.map(({ id, imgURL, name, description }) => {
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
  heroesList: {},
  match: {},
};

Heroes.propTypes = {
  heroesList: PropTypes.shape({
    heroes: PropTypes.arrayOf(PropTypes.object),
    count: PropTypes.number,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
    }),
  }),
  load: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Heroes);
