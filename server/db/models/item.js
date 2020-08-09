const { UUID, UUIDV4, FLOAT, STRING } = require('sequelize');
const db = require('../db_index');

const Item = db.define('item', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  heroId: {
    type: STRING,
    allowNull: false,
  },
  heroName: {
    type: STRING,
    allowNull: false,
  },
  heroImgURL: {
    type: STRING,
    allowNull: false,
  },
  actId: {
    type: STRING,
    allowNull: false,
  },
  actName: {
    type: STRING,
    allowNull: false,
  },
  price: {
    type: FLOAT,
    allowNull: false,
  },
});

module.exports = Item;
