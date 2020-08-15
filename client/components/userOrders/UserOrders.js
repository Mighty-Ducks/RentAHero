import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './userOrders.scss';
import { fetchUserOrders } from '../../store/actions';

class UserOrders extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      load,
    } = this.props;
    load(id);
  }

  render() {
    const { orders } = this.props;
    return (
      <div className="order-history">
        <h2>Order History</h2>
        <ol>
          {orders.map((order) => {
            return (
              <div className='order' key={order.id}>
                <h6>
                  <strong>Order ID:&nbsp;</strong>
                  {order.id}
                </h6>
                <h6>
                  <strong>Order Date:&nbsp;</strong>
                  {new Date(order.updatedAt).toDateString()}
                </h6>
                {order.items.map((item) => {
                  return (
                    <div className="row mb-4" key={item.id}>
                      <div className="col-md-5 col-lg-3 col-xl-3">
                        <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                          <img
                            className="img-fluid w-100"
                            src={item.heroImgURL}
                            alt="hero"
                          />
                        </div>
                      </div>
                      <div className="col-md-7 col-lg-9 col-xl-9">
                        <div>
                          <div className="d-flex justify-content-between">
                            <div>
                              <Link to={`/heroes/${item.heroId}`}>
                                {item.heroName}
                              </Link>
                              <p className="mb-2 text-muted text-uppercase small">
                                {item.actName}
                              </p>
                              <p className="mb-2 text-muted text-uppercase small">
                                <strong>Appointment</strong>
                                <br />
                                {new Date(item.datetime).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-0">
                              <strong>{`$${item.price}`}</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <h5 className="order-total">
                  <strong>Total:&nbsp;$</strong>
                  {order.total}
                </h5>
              </div>
            );
          })}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.users.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: (id) => {
      dispatch(fetchUserOrders(id));
    },
  };
};

UserOrders.defaultProps = {
  orders: [],
  match: {},
};

UserOrders.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  load: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);
