import React from 'react';
import { Link } from 'react-router-dom';
import './cart.scss';

const heroCard = (hero) => {
  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-5 col-lg-3 col-xl-3">
          <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
            <img className="img-fluid w-100" src={hero.imgURL} alt="hero" />
          </div>
        </div>
        <div className="col-md-7 col-lg-9 col-xl-9">
          <div>
            <div className="d-flex justify-content-between">
              <div>
                <Link to={`/heroes/${hero.id}`}>{hero.name}</Link>
                <p className="mb-2 text-muted text-uppercase small"> Act </p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <a
                  href="#!"
                  type="button"
                  className="card-link-secondary small text-uppercase mr-3"
                >
                  <i className="fas fa-trash-alt mr-1"></i>
                  Remove item
                </a>
              </div>
              <p className="mb-0">
                <span>
                  <strong>Price$$$</strong>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="mb-4" />
    </div>
  );
};

export default heroCard;
