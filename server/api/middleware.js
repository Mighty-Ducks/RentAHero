const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = require('./server');
const { Session, User } = require('../db/models/models_index');

const DIST_PATH = path.join(__dirname, '../../dist');
const PUBLIC_PATH = path.join(__dirname, '../../public');

app.use(express.json());

const expressMiddleware = () => {
  app.use('/dist', express.static(DIST_PATH));
  app.use(express.static(PUBLIC_PATH));
};

app.use(cookieParser());
// Checking for cookie and assigning one if not exist.
app.use(async (req, res, next) => {
  // To make sure cookie is in db
  const sessionId = await Session.findByPk(req.cookies.session_id);

  if (!req.cookies.session_id || !sessionId) {
    const session = await Session.create();
    res.cookie('session_id', session.id);
    req.session_id = session.id;
    next();
  } else {
    req.session_id = req.cookies.session_id;
    const user = await User.findOne({
      include: {
        model: Session,
        where: {
          id: req.session_id,
        },
      },
    });
    if (user) {
      req.user = user;
    }

    next();
  }
});

module.exports = expressMiddleware;
