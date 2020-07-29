const startServer = require('./api/index');
const syncAndSeed = require('./db/syncAndSeed');
// const seed = require('./seed');

const startApplication = async () => {
  await syncAndSeed({ force: true });
  await startServer();
};

startApplication();
