const { UUID, UUIDV4, FLOAT, BOOLEAN } = require('sequelize');
const db = require('../db_index');

const Cart = db.define(
  'cart',
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    total: {
      type: FLOAT,
      allowNull: false,
    },
    status: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Cart;
