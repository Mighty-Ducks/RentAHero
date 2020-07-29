const { UUID, UUIDV4, STRING, FLOAT } = require('sequelize');
const db = require('../db_index');

const Act = db.define('act', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: STRING,
  },
  price: {
    type: FLOAT,
    allowNull: false,
  },
});

module.exports = Act;
