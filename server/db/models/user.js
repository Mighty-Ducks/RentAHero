const { UUID, UUIDV4, STRING, BOOLEAN } = require('sequelize');
const db = require('../db_index');

const User = db.define('user', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userName: {
    // Email
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  admin: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

export default User;
