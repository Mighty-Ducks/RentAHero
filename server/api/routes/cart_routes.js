// const cartRouter = require('express').Router();
// const { check, validationResult } = require('express-validator');
// const { Cart } = require('../../db/models/models_index.js');

// // app.use('/api/cart', cartRouter) in routes_index.js

// // get all items in cart
// cartRouter.get('/', async (req, res) => {
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

// add an item to cart
// cartRouter.post('/item/:id', async (req, res) => {
//     const { firstName, lastName, email, password } = req.body;
//     const admin = false;

//     try {
//       const user = await User.create({
//         firstName,
//         lastName,
//         email,
//         password: hash(password),
//         admin,
//       });
//       const usersSession = await Session.findByPk(req.session_id);

//       await usersSession.setUser(user);

//       res.status(200).send(user);
//     } catch (e) {
//       console.error(e);
//       res.status(500).send({ message: 'Server error' });
//     }
// });

// module.exports = cartRouter;
