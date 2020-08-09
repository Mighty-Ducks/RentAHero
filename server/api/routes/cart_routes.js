const cartRouter = require('express').Router();
const chalk = require('chalk');
// const { check, validationResult } = require('express-validator');
const { Cart, Item } = require('../../db/models/models_index.js');

// app.use('/api/cart', cartRouter) in routes_index.js

// get all items in cart '/api/cart/'
cartRouter.get('/', async (req, res) => {
  // id belongs to cart
  const cart = await Cart.findOne({ where: { sessionId: req.session_id } });
  try {
    const items = await Item.findAll({ where: { cartId: cart.id } });
    res.status(200).send(items);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// delete an item from cart '/api/cart/item/:id'
cartRouter.delete('/item/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);
    const cart = await Cart.findByPk(item.cartId);

    if (item) {
      item.destroy();
      const items = await Item.findAll({ where: { cartId: cart.id } });
      if (!items) {
        cart.destroy();
      }
      res.status(204).send({ message: `Item id: ${id} succesfully deleted.` });
    } else {
      res.status(404).send({ message: `Item id: ${id} not found.` });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// add an item to cart - if a cart does not exist create one!
// '/api/cart/item'
cartRouter.post('/item', async (req, res) => {
  console.log(chalk.yellow(`request was made to ${req.path}`));
  const isCart = await Cart.findOne({
    where: {
      sessionId: req.session_id,
    },
  });

  const {
    heroId,
    heroName,
    heroImgURL,
    actId,
    actName,
    price,
    total,
  } = req.body;

  if (isCart) {
    try {
      console.log(req.body);
      const item = await Item.create({
        heroId,
        heroName,
        heroImgURL,
        actId,
        actName,
        price,
        cartId: isCart.id,
      });
      res.status(200).send(item);
    } catch (e) {
      console.error(e);

      res.status(500).send({ message: 'Server error' });
    }
  } else {
    try {
      const cart = await Cart.create({
        total,
        userId: req.user ? req.user.id : null,
        sessionId: req.session_id,
      });
      const item = await Item.create({
        heroId,
        heroName,
        heroImgURL,
        actId,
        actName,
        price,
        cartId: cart.id,
      });
      res.status(200).send(item);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Server error' });
    }
  }
});

module.exports = cartRouter;
