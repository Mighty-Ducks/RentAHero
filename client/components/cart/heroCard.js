import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import './cart.scss';

const heroCard = (
  { id, heroId, heroName, heroImgURL, actName, datetime, price },
  deleteItem
) => {
  return (
    <div key={id}>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
            <img className="img-fluid w-100" src={heroImgURL} alt="hero" />
          </div>
        </div>
        <div className="col-md-8">
          <div className="d-flex justify-content-between">
            <h5>
              <Link to={`/heroes/${heroId}`}>{heroName}</Link>
            </h5>
            <p className="text-muted text-uppercase small">{actName}</p>
            <p className="text-muted text-uppercase small">
              <strong>Appointment</strong>
              <br />
              {moment(datetime).format('LLLL')}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <button
                type="button"
                className="btn btn-danger"
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
  datetime: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  event: PropTypes.shape({
    datetime: PropTypes.string.isRequired,
  }).isRequired,
};

export default heroCard;
