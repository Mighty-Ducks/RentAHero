const { UUID, UUIDV4 } = require('sequelize');
const db = require('../db_index');

const Session = db.define('session', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
});

module.exports = Session;
