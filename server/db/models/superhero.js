const { UUID, UUIDV4, STRING, TEXT, INTEGER } = require('sequelize');
const db = require('../db_index');

const Superhero = db.define('hero', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imgURL: {
    type: STRING,
  },
  description: {
    type: TEXT,
  },
  popularity: {
    type: INTEGER,
    defaultValue: 0,
  },
});

module.exports = Superhero;
