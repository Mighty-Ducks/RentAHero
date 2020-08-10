const cartRouter = require('express').Router();
const chalk = require('chalk');
// const { check, validationResult } = require('express-validator');
const { Cart, Item } = require('../../db/models/models_index.js');

// app.use('/api/cart', cartRouter) in routes_index.js

// get all items in cart
// cartRouter.get('/items/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const users = await Cart.findAll();
//     res.status(200).send(users);
//   } catch (e) {
//     console.error(e);
//     res.status(500).send({ message: 'Server error' });
//   }
// });

// delete an item - needs to be edit!
// cartRouter.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findByPk(id);

//     if (user) {
//       user.destroy();
//       res.status(204).send({ message: `User id: ${id} succesfully deleted.` });
//     } else {
//       res.status(404).send({ message: `User id: ${id} not found.` });
//     }
//   } catch (e) {
//     console.error(e);
//     res.status(500).send({ message: 'Server error' });
//   }
// });

// add an item to cart - if a cart does not exist create one!
cartRouter.post('/item', async (req, res) => {
  console.log(chalk.yellow(`request was made to ${req.path}`));
  const isCart = await Cart.findOne({
    where: {
      sessionId: req.session_id,
    },
  });

  const { heroId, actId, price, total } = req.body;

  if (isCart) {
    try {
      const item = await Item.create({
        price,
        heroId,
        actId,
      });
      isCart.setItems(item);
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
        price,
        heroId,
        actId,
      });
      cart.setItems(item);
      res.status(200).send(item);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Server error' });
    }
  }
});

module.exports = cartRouter;
