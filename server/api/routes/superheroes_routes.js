const superheroesRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const { Superhero } = require('../../db/models/models_index.js');

// app.use('/api/superheroes', superheroesRouter) in routes_index.js

// get all superheroes
superheroesRouter.get('/', async (req, res) => {
  try {
    const superheroes = await Superhero.findAll();

    res.status(200).send(superheroes);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// get individual superhero
superheroesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const superhero = await Superhero.findByPk(id);

    if (superhero) {
      res.status(200).send(superhero);
    } else {
      res.status(404).send({ message: `Superhero id: ${id} not found.` });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// update/edit superhero
superheroesRouter.put(
  '/:id',
  [check('name', 'Hero name is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { name, imgURL, description, actId } = req.body; // review to agree on properties for superhero

    try {
      const superhero = await Superhero.findByPk(id);

      if (superhero) {
        const updatedSuperhero = await superhero.update({
          name,
          imgURL,
          description,
          actId,
        });
        res.status(200).send(updatedSuperhero);
      }

      res.status(404).send({ message: `Superhero id: ${id} not found.` });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Server error' });
    }
  }
);

// delete a superhero
superheroesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const superhero = await Superhero.findByPk(id);

    if (superhero) {
      superhero.destroy();
      res
        .status(204)
        .send({ message: `Superhero id: ${id} succesfully deleted.` });
    } else {
      res.status(404).send({ message: `Superhero id: ${id} not found.` });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// add a superhero
superheroesRouter.post(
  '/',
  [check('name', 'Hero name is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, imgURL, description, actId } = req.body;

    try {
      const superhero = await Superhero.create({
        name,
        imgURL,
        description,
        actId,
      });
      res.status(200).send(superhero);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Server error' });
    }
  }
);

module.exports = superheroesRouter;
