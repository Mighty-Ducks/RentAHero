import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCategories } from '../../store/actions';
import './categoriesLinks.scss';

class CategoriesLinks extends Component {
  componentDidMount() {
    const { load } = this.props;
    load();
  }

  render() {
    const { categoriesList } = this.props;
    return (
      <div className="col-md-3">
        <ul className="list-group">
          {categoriesList &&
            categoriesList.map((category) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={category.name}
                >
                  <Link to={`/categories/${category.name}/page/1`}>
                    {category.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoriesList: state.categories.categoriesList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(fetchCategories());
    },
  };
};

CategoriesLinks.defaultProps = {
  categoriesList: [],
};

CategoriesLinks.propTypes = {
  categoriesList: PropTypes.arrayOf(PropTypes.object),
  load: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesLinks);
