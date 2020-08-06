import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './heroes.scss';
import { fetchHeroes, setPage } from '../../store/actions';

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

  render() {
    const {
      heroesList,
      load,
      match: {
        params: { page },
      },
    } = this.props;
    const pageNumbers = (pages) => {
      const pagesArray = [];
      for (let i = 0; i < pages; i++) {
        pagesArray.push(i);
      }
      return pagesArray.map((page) => {
        return (
          <li key={page}>
            <Link onClick={() => load(page)} to={`/heroes/page/${page}`}>
              {page}
            </Link>
          </li>
        );
      });
    };

    return (
      <div className="px-3">
        <h1>Heroes</h1>
        <nav aria-label="Page navigation example">
          {pageNumbers(heroesList.pages)}
        </nav>
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
              {heroesList.heroes
                ? heroesList.heroes.map(({ id, imgURL, name, description }) => {
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
                })
                : null}
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
      dispatch(setPage(page));
    },
  };
};

Heroes.defaultProps = {
  heroesList: {},
};

Heroes.propTypes = {
  heroesList: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps, mapDispatchToProps)(Heroes);
