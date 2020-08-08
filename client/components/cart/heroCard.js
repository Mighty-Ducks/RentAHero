import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './cart.scss';

const heroCard = (
  { id, heroId, heroName, heroImgURL, actName, price },
  deleteItem
) => {
  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-5 col-lg-3 col-xl-3">
          <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
            <img className="img-fluid w-100" src={heroImgURL} alt="hero" />
          </div>
        </div>
        <div className="col-md-7 col-lg-9 col-xl-9">
          <div>
            <div className="d-flex justify-content-between">
              <div>
                <Link to={`/heroes/${heroId}`}>{heroName}</Link>
                <p className="mb-2 text-muted text-uppercase small">
                  {actName}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <button
                  type="button"
                  className="deleteButton"
                  onClick={() => deleteItem(id)}
                >
                  Remove item
                </button>
              </div>
              <p className="mb-0">
                <span>
                  <strong>{`$${price}`}</strong>
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

heroCard.propTypes = {
  id: PropTypes.string.isRequired,
  heroId: PropTypes.string.isRequired,
  heroName: PropTypes.string.isRequired,
  heroImgURL: PropTypes.string.isRequired,
  actName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default heroCard;
