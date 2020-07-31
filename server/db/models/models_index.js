const Superhero = require('./superhero');
const Act = require('./act');
const Category = require('./category');
const User = require('./user');
const Session = require('./session');

// Relations between superheroes and their acts.
Act.belongsToMany(Superhero, { through: 'HeroAct' });
Superhero.belongsToMany(Act, { through: 'HeroAct' });

// Relations between superheroes and categories.
Category.belongsToMany(Superhero, { through: 'HeroCategory' });
Superhero.belongsToMany(Category, { through: 'HeroCategory' });

// Relations between users and sessions.
User.hasMany(Session);
Session.belongsTo(User);

module.exports = { Superhero, Act, Category, User, Session };
