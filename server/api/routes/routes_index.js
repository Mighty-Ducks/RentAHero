// app.use for all the diffrent routes
const superheroesRouter = require('./superheroes_routes');
const actsRouter = require('./acts_routes');
const categoriesRouter = require('./categories_routes');
const usersRouter = require('./user_routes');
const cartRouter = require('./cart_routes');
const app = require('../server');

const applyRoutes = () => {
  app.use('/api/superheroes', superheroesRouter);
  app.use('/api/acts', actsRouter);
  app.use('/api/categories', categoriesRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/cart', cartRouter);
};

module.exports = applyRoutes;
