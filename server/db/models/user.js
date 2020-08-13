const { UUID, UUIDV4, STRING, BOOLEAN, INTEGER } = require('sequelize');
const db = require('../db_index');

const User = db.define(
  'user',
  {
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
    // username
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
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
    street: {
      type: STRING,
    },
    state: {
      type: STRING,
    },
    zip: {
      type: INTEGER,
    },
    admin: {
      type: BOOLEAN,
      defaultValue: false,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      login: {
        attributes: { include: ['password'] },
      },
    },
  }
);

module.exports = User;
