// app.use for all the diffrent routes
const superheroesRouter = require('./superheroes_routes');

const applyRoutes = (app) => {
    app.use('/api/superheroes', superheroesRouter);
}

module.exports = applyRoutes;
