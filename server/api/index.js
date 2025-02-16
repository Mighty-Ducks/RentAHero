const chalk = require('chalk');
const app = require('./server');
const applyRoutes = require('./routes/routes_index');
const expressMiddleware = require('./middleware');

const PORT = process.env.PORT || 3000;

applyRoutes();
expressMiddleware();

const startServer = () => {
  return new Promise((res) => {
    app.listen(PORT, () => {
      console.log(chalk.green(`App is now listening to PORT:${PORT}`));
    });
    res();
  });
};

module.exports = {
  startServer,
  app,
};
