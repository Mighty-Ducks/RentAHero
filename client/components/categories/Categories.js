import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Popup from '../popup/Popup';
import AddHeroForm from '../addHeroForm/AddHeroForm';
import Paginator from '../paginator/Paginator';
import CategoriesLinks from '../categoriesLinks/CategoriesLinks';
import { fetchCategoryHeroes } from '../../store/actions';
import './categories.scss';

class Categories extends Component {
  componentDidMount() {
    const {
      match: {
        params: { categoryName, page },
      },
      load,
    } = this.props;
    load(categoryName, page);
  }

  componentDidUpdate(prevProps) {
    const {
      heroes,
      match: {
        params: { categoryName, page },
      },
      load,
    } = this.props;
    if (prevProps.heroes === heroes) {
      load(categoryName, page);
    }
  }

  render() {
    const {
      heroes,
      categoryTotal,
      match: {
        params: { categoryName, page },
      },
    } = this.props;
    const limit = 6;
    const pages = Array.from(
      {
        length: Math.ceil(categoryTotal / limit),
      },
      (v, i) => i + 1
    );
    return (
      <div className="px-3">
        <div className="header">
          <h1>
            {categoryName}
            Heroes
          </h1>
        </div>
        <div className="row mt-5">
          <CategoriesLinks />
          <div className="col-md-9">
            <Popup
              title="Create a Hero"
              buttonText="Create"
              BodyModal={AddHeroForm}
            />
            <Paginator pages={pages || []} page={+page || 1} />
            <div className="heroes-list row row-cols-1 row-cols-md-3">
              {heroes &&
                heroes.map(({ id, imgURL, name, description }) => {
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
            <Paginator pages={pages || []} page={+page || 1} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    heroes: state.categories.heroes,
    categoryTotal: state.categories.categoryTotal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: (categoryName, page) => {
      dispatch(fetchCategoryHeroes(categoryName, page));
    },
  };
};

Categories.defaultProps = {
  heroes: [],
  match: {},
};

Categories.propTypes = {
  heroes: PropTypes.arrayOf(PropTypes.object),
  categoryTotal: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryName: PropTypes.string,
      page: PropTypes.string,
    }),
  }),
  load: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
