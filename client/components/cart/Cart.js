import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    const {
      history: {
        location: { pathname },
      },
    } = this.props;

    return (
      <section>
        <div className="row container-xl cart">
          <div className="col-lg-8">
            <div className="card wish-list mb-3">
              <div className="card-body">
                <h1 className="mb-4">{`Cart (${cart.length} items)`}</h1>
                {cart.map((item) => heroCard(item, deleteItem))}
              </div>
            </div>
          </div>
          {pathname !== '/checkout' && (
            <div className="col-lg-4">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="mb-3">The total amount of</h5>
                  <ul className="list-group list-group-flush">
                    {cart.map((item) => {
                      return (
                        <li
                          key={item.id}
                          className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                        >
                          {item.actName}
                          <span className="space-dots"></span>
                          <span>{`$${item.price}`}</span>
                        </li>
                      );
                    })}
                    <li
                      key="totalAmount"
                      className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 total"
                    >
                      Total Amount
                      <span className="space-dots"></span>
                      <strong className="h1">
                        $
                        {cart.reduce((acc, curr) => {
                          return acc + curr.price;
                        }, 0)}
                      </strong>
                    </li>
                  </ul>
                </div>
                <div className="card-footer text-center">
                  <Link
                    to="/checkout"
                    type="button"
                    className="btn btn-primary"
                  >
                    go to checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
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
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
