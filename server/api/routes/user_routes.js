const usersRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const { User, Session } = require('../../db/models/models_index.js');
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
    const { firstName, lastName, email, password, admin } = req.body; // review to agree on properties for superhero

    try {
      const user = await User.findByPk(id);

      if (user) {
        const updatedUser = await user.update({
          firstName,
          lastName,
          email,
          password,
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
    check('firstName', 'User name is required').not().isEmpty(),
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

  const user = await User.findOne({
    where: {
      email,
      password: hash(password),
    },
  });

  console.log('Login request from:', req.body, 'user', user);

  if (!user) {
    res.status(401).send({ message: `User ${email} not found` });
  } else {
    const usersSession = await Session.findByPk(req.session_id);

    await usersSession.setUser(user);

    res.sendStatus(201);
  }
});

module.exports = usersRouter;
