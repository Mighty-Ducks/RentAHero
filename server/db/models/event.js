const { UUID, UUIDV4, DATE } = require('sequelize');
const db = require('../db_index');

const Event = db.define('event', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  datetime: {
    type: DATE,
    allowNull: false,
  },
});

module.exports = Event;
