import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Paginator extends Component {
  render() {
    const { pages, page } = this.props;

    return (
      <nav className="pages d-flex justify-content-end">
        <ul className="pagination">
          <li className="page-item">
            <Link
              className="page-link"
              aria-label="Previous"
              to={`/heroes/page/${page - 1 || 1}`}
            >
              <span aria-hidden="true">&laquo;</span>
            </Link>
          </li>
          {pages.map((pg) => {
            return (
              <li
                className={`page-item${pg === page ? ' active' : ''}`}
                key={pg}
              >
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
                page + 1 >= pages.length ? pages.length : page + 1
              }`}
            >
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

Paginator.defaultProps = {
  pages: [],
  page: 1,
};

Paginator.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.number),
  page: PropTypes.number,
};
