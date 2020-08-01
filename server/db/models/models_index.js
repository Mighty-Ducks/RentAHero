const Superhero = require('./superhero');
const Act = require('./act');
const Category = require('./category');
const User = require('./user');

Act.belongsToMany(Superhero, { through: 'HeroAct' });
Superhero.belongsToMany(Act, { through: 'HeroAct' });

Category.belongsToMany(Superhero, { through: 'HeroCategory' });
Superhero.belongsToMany(Category, { through: 'HeroCategory' });

module.exports = { Superhero, Act, Category, User };
