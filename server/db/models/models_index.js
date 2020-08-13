const Superhero = require('./superhero');
const Act = require('./act');
const Category = require('./category');
const User = require('./user');
const Session = require('./session');
const Item = require('./item');
const Cart = require('./cart');
const Event = require('./event');

// Relations between superheroes and their acts.
Act.belongsToMany(Superhero, { through: 'HeroAct' });
Superhero.belongsToMany(Act, { through: 'HeroAct' });

// Relations between superheroes and categories.
Category.belongsToMany(Superhero, { through: 'HeroCategory' });
Superhero.belongsToMany(Category, { through: 'HeroCategory' });

// Relations between users and sessions.
User.hasMany(Session);
Session.belongsTo(User);

// Relations between cart to User or Session
User.hasMany(Cart);
Cart.belongsTo(User);

Session.hasMany(Cart);
Cart.belongsTo(Session);

// Relation between items and cart
Cart.hasMany(Item);
Item.belongsTo(Cart);

// Relation between events and heroes
Superhero.hasMany(Event);
Event.belongsTo(Superhero);
Event.belongsTo(Item, { onDelete: 'cascade', hooks: true });
Item.hasOne(Event);

module.exports = { Superhero, Act, Category, User, Session, Item, Cart, Event };
