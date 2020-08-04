const { UUID, UUIDV4, FLOAT } = require('sequelize');
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
  },
  {
    freezeTableName: true,
  }
);

module.exports = Cart;
