const usersRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const {
  Cart,
  Item,
  User,
  Session,
  Event,
} = require('../../db/models/models_index.js');
const hash = require('../../utilities/index');

// app.use('/api/users', usersRouter) in routes_index.js

// get all users - If admin (for later)
usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// get user by session
usersRouter.get('/session', async (req, res) => {
  try {
    const session = await Session.findByPk(req.session_id);

    if (session.userId) {
      const user = await User.findByPk(session.userId);
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// get individual user
usersRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: `user id: ${id} not found.` });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

usersRouter.get('/:id/orders', async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Cart.findAll({
      where: {
        userId: id,
        status: true,
      },
      include: [
        {
          model: Item,
          include: [Event],
        },
      ],
    });
    if (orders) {
      res.status(200).send(orders);
    } else {
      res.status(404).send({ message: `Orders not found.` });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// User logout
usersRouter.put('/logout', async (req, res) => {
  const session = await Session.findByPk(req.session_id);
  try {
    await session.update({ userId: null });
    res.status(201).send({ message: `user loggedout` });
  } catch (e) {
    res.status(500).send({ message: 'Server error' });
  }
});

// update/edit user
usersRouter.put(
  '/:id',
  [check('email', 'email is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      password,
      street,
      state,
      zip,
      admin,
    } = req.body;

    // const updParams = {};

    // if (firstName) updParams.firstName = firstName;
    // if (lastName) updParams.lastName = lastName;
    // if (email) updParams.email = email;
    // if (actIds) updParams.actIds = actIds;
    // if (categoryIds) updParams.categoryIds = categoryIds;

    try {
      const user = await User.findByPk(id);

      if (user) {
        const updatedUser = await user.update({
          firstName,
          lastName,
          email,
          password,
          street,
          state,
          zip,
          admin,
        });
        res.status(200).send(updatedUser);
      }

      res.status(404).send({ message: `User id: ${id} not found.` });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Server error' });
    }
  }
);

// delete a user
usersRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (user) {
      user.destroy();
      res.status(204).send({ message: `User id: ${id} succesfully deleted.` });
    } else {
      res.status(404).send({ message: `User id: ${id} not found.` });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// add a user - register
usersRouter.post(
  '/register',
  [
    check('firstName', 'User firstName is required').not().isEmpty(),
    check('lastName', 'User lastName is required').not().isEmpty(),
    check('email', 'Include a valid email').isEmail(),
    check('password', 'Enter a password with 6 or more characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, password } = req.body;
    const admin = false;

    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hash(password),
        admin,
      });
      const usersSession = await Session.findByPk(req.session_id);

      await usersSession.setUser(user);

      res.status(200).send(user);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Server error' });
    }
  }
);

// User login
usersRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.scope('login').findOne({
    where: {
      email,
    },
  });

  // console.log('Login request from:', req.body, 'user', user);

  if (!user) {
    res.status(401).send({ message: `User ${email} does not exist` });
  } else if (hash(password) === user.password) {
    const usersSession = await Session.findByPk(req.session_id);

    await usersSession.setUser(user);

    res.sendStatus(201);
  } else {
    res.status(401).send({ message: `Password is incorrect` });
  }
});

module.exports = usersRouter;
