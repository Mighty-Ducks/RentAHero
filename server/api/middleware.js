const express = require('express');
const path = require('path');
const app = require('./server');

const DIST_PATH = path.join(__dirname, '../../dist');
const PUBLIC_PATH = path.join(__dirname, '../../public');

app.use(express.json());

const expressMiddleware = () => {
  app.use('/dist', express.static(DIST_PATH));
  app.use(express.static(PUBLIC_PATH));
};

module.exports = expressMiddleware;
