import React, { Component } from 'react';
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
    console.log(orders);
    return (
      <div className="order-history">
        <h2>Order History</h2>
        <ol>
          {orders.map((order) => {
            return (
              <li className="order" key={order.id}>
                <p>Order ID: {order.id}</p>
                <p>Order Date: {Date.parse(order.updatedAt)}</p>
                <ul>
                  {order.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <img src={item.heroImgURL} alt="hero image"/>
                        <p>{item.heroName}</p>
                        <p>{item.actName}</p>
                      </li>
                    );
                  })}
                  <p>Order Total: ${order.total}</p>
                </ul>
              </li>
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
