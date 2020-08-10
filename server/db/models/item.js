const { UUID, UUIDV4, FLOAT } = require('sequelize');
const db = require('../db_index');

const Item = db.define('item', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  price: {
    type: FLOAT,
    allowNull: false,
  },
});

module.exports = Item;
