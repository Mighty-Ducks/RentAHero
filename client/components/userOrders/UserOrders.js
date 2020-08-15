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
      <div className="card mb-3">
        <div className="card-body">
          <h2 className="card-title">Order History</h2>
          {orders.map((order) => {
            return (
              <div className="order" key={order.id}>
                <p className="card-text">
                  <span className="text-muted small">Order ID:&nbsp;</span>
                  {order.id}
                </p>
                <p className="card-text">
                  <span className="text-muted small">Order Date:&nbsp;</span>
                  {new Date(order.updatedAt).toDateString()}
                </p>
                {order.items.map((item) => {
                  return (
                    <div className="row mb-4" key={item.id}>
                      <div className="col-md-4">
                        <img
                          className="card-img"
                          src={item.heroImgURL}
                          alt={item.heroName}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h5>
                              <Link to={`/heroes/${item.heroId}`}>
                                {item.heroName}
                              </Link>
                            </h5>
                            <p className="mb-2 text-muted text-uppercase small">
                              {item.actName}
                            </p>
                            <p className="mb-2 text-muted text-uppercase small">
                              <strong>Appointment</strong>
                              <br />
                              {new Date(item.datetime).toLocaleString()}
                            </p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <strong>{`$${item.price}`}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="total d-flex justify-content-between align-items-center">
                  Total Amount
                  <span className="space-dots"></span>
                  <strong className="h1">{`$${order.total}`}</strong>
                </div>
              </div>
            );
          })}
        </div>
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
