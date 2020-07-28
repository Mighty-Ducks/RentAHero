// app.use for all the diffrent routes
const superheroesRouter = require('./superheroes_routes');
const app = require('../server');

const applyRoutes = () => {
  app.use('/api/superheroes', superheroesRouter);
};

module.exports = applyRoutes;
