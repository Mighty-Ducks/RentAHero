import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import heroCard from './heroCard';
import './cart.scss';

class Cart extends Component {
  render() {
    const { heroesList } = this.props;

    return (
      <section>
        <div className="row container-xl">
          <div className="col-lg-8">
            <div className="card wish-list mb-3">
              <div className="card-body">
                <h5 className="mb-4">{`Cart (${heroesList.length} items)`}</h5>
                {heroesList.map((hero) => heroCard(hero))}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="mb-3">The total amount of</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Temporary amount
                    <span>$25.98</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Gratis</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>The total amount of</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>$53.98</strong>
                    </span>
                  </li>
                </ul>
                <button
                  type="button"
                  className="btn btn-primary btn-block waves-effect waves-light"
                >
                  go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    heroesList: state.heroes.heroesList,
  };
};

Cart.defaultProps = {
  heroesList: [],
};

Cart.propTypes = {
  heroesList: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(Cart);
