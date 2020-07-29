const chalk = require('chalk');
const db = require('./db_index');
const initialData = require('./seed');

const seedInitialData = ({ force = false }) => {
  return new Promise((res, rej) => {
    initialData({ force });
    res(console.log(chalk.greenBright('Initial data seeded!')));
  });
};

const syncAndSeed = async ({ force = false }) => {
  try {
    console.log(chalk.red(`Force = ${force}`));
    await db.sync({ force });
    console.log(chalk.greenBright('DataBase synced successfully.'));
    await seedInitialData({ force });
    console.log(chalk.greenBright('DataBase seeded successfully.'));
  } catch (e) {
    console.log(chalk.red('Database failed to sync!'));
    throw e;
  }
};

module.exports = syncAndSeed;
