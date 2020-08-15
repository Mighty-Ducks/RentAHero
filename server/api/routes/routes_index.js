// app.use for all the diffrent routes
const app = require('../server');
const superheroesRouter = require('./superheroes_routes');
const actsRouter = require('./acts_routes');
const categoriesRouter = require('./categories_routes');
const usersRouter = require('./user_routes');
const cartRouter = require('./cart_routes');
const searchRouter = require('./search_routes');
const eventRouter = require('./event_routes');
const paymentRouter = require('./payment_routes');

const applyRoutes = () => {
  app.use('/api/superheroes', superheroesRouter);
  app.use('/api/acts', actsRouter);
  app.use('/api/categories', categoriesRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/cart', cartRouter);
  app.use('/api/search', searchRouter);
  app.use('/api/event', eventRouter);
  app.use('/api/payment', paymentRouter);
};

module.exports = applyRoutes;
