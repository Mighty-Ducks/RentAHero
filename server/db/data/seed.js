const chalk = require('chalk');
const { Superhero, Act, Category, User } = require('../models/models_index');
const { superheroes, acts, categories, users } = require('./data');

const initialData = async ({ force = false }) => {
  if (force) {
    try {
      const actsCreated = await Promise.all(acts.map((act) => Act.create(act)));
      await Promise.all(
        categories.map((category) => Category.create(category))
      );

      superheroes.forEach(async (superhero) => {
        const superheroCreated = await Superhero.create(superhero.hero);
        const heroActsCreated = await Promise.all(
          superhero.acts.map((act) => Act.create(act))
        );

        const actsForHero = [...actsCreated, ...heroActsCreated];
        const categoriesForHero = await Promise.all(
          superhero.categories.map((category) =>
            Category.findOne({ where: { name: category.name } })
          )
        );

        await superheroCreated.setActs(actsForHero);
        await superheroCreated.setCategories(categoriesForHero);
      });

      await Promise.all(users.map((user) => User.create(user)));
    } catch (e) {
      console.log(chalk.magenta('error'));
      throw e;
    }
  }
};

module.exports = initialData;
