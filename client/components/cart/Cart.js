import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import heroCard from './heroCard';
import { fetchCart, removeItem } from '../../store/actions';
import './cart.scss';

class Cart extends Component {
  componentDidMount() {
    const { load } = this.props;
    load();
  }

  render() {
    const { cart, deleteItem } = this.props;

    return (
      <section>
        <div className="row container-xl">
          <div className="col-lg-8">
            <div className="card wish-list mb-3">
              <div className="card-body">
                <h5 className="mb-4">{`Cart (${cart.length} items)`}</h5>
                {cart.map((item) => {
                  return heroCard(item, deleteItem);
                })}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="mb-3">The total amount of</h5>
                <ul className="list-group list-group-flush">
                  {cart.map((item) => {
                    return (
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        {item.actName}
                        <span>{`$${item.price}`}</span>
                      </li>
                    );
                  })}
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Total Amount
                    <span>
                      {`$${cart.reduce((acc, curr) => {
                        return acc + curr.price;
                      }, 0)}`}
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
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(fetchCart());
    },
    deleteItem: (id) => {
      dispatch(removeItem(id));
    },
  };
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  load: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
