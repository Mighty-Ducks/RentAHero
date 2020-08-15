const chalk = require('chalk');
const db = require('./db_index');
const initialData = require('./data/seed');

const seedInitialData = ({ force = false }) => {
  return new Promise((res) => {
    initialData({ force });
    res(console.log(chalk.greenBright('Initial data seeded!')));
  });
};

const syncAndSeed = async ({ force = false }) => {
  console.log(chalk.red(`Force = ${force}`));
  try {
    await db.sync({ force });
    console.log(chalk.greenBright('DataBase synced successfully.'));
    if (force) {
      await seedInitialData({ force });
    }
  } catch (e) {
    console.log(chalk.red('Database failed to sync!'));
    throw e;
  }
};

module.exports = syncAndSeed;
