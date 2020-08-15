const eventRouter = require('express').Router();
// const chalk = require('chalk');
const { check, validationResult } = require('express-validator');
const { Event } = require('../../db/models/models_index.js');

// app.use('/api/event', eventRouter) in routes_index.js

// get all events by heroId '/api/event/:id'
eventRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const events = await Event.findAll({ where: { heroId: id } });
    res.status(200).send(events);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// add a superhero
eventRouter.post(
  '/',
  [
    check('heroId', 'Hero id is required').not().isEmpty(),
    check('datetime', 'date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }

    const { heroId, datetime, itemId } = req.body;

    try {
      const event = await Event.create({
        heroId,
        datetime,
        itemId,
      });
      res.status(200).send(event);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Server error' });
    }
  }
);

module.exports = eventRouter;
