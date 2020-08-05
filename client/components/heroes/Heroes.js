import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './heroes.scss';

class Heroes extends Component {
  render() {
    const { heroesList } = this.props;

    return (
      <div className="px-3">
        <h1>Heroes</h1>
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
              {heroesList.map(({ id, imgURL, name, description }) => {
                return (
                  <div className="col mb-4" key={id}>
                    <div className="card h-100 ">
                      <div className="card-img-body border-bottom">
                        <Link to={`heroes/${id}`}>
                          <img
                            src={imgURL}
                            className="card-img-top"
                            alt={name}
                          />
                        </Link>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          <Link to={`heroes/${id}`}>{name}</Link>
                        </h5>
                        <p className="card-text">{description}</p>
                      </div>
                      <div className="card-footer text-center">
                        <Link to={`heroes/${id}`} className="btn btn-primary">
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
    heroesList: state.heroes.heroesList.heroes,
  };
};

Heroes.defaultProps = {
  heroesList: [],
};

Heroes.propTypes = {
  heroesList: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(Heroes);
