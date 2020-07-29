const startServer = require('./api/index');
// const seed = require('./seed');

const startApplication = async () => {
  // await seed();
  // await sync();
  await startServer();
};

startApplication();
