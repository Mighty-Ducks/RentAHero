const actsRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const { Act, Superhero } = require('../../db/models/models_index.js');

// get all acts
actsRouter.get('/', async (req, res) => {
  try {
    const acts = await Act.findAll({
      include: [Superhero],
    });

    res.status(200).send(acts);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// get individual act
actsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const act = await Act.findByPk(id, {
      include: [Superhero],
    });

    if (act) {
      res.status(200).send(act);
    } else {
      res.status(404).send({ message: `Act id: ${id} not found.` });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// update/edit act
actsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, heroId } = req.body;

  try {
    const act = await Act.findByPk(id);

    if (act) {
      const updatedAct = await act.update({
        name,
        description,
        price,
        heroId,
      });
      res.status(200).send(updatedAct);
    } else {
      res.status(404).send({ message: `Act id: ${id} not found.` });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// delete a act
actsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const act = await Act.findByPk(id);

    if (act) {
      act.destroy();
      res.status(204).send({ message: `Act id: ${id} succesfully deleted.` });
    } else {
      res.status(404).send({ message: `Act id: ${id} not found.` });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// add an act
actsRouter.post(
  '/',
  [
    check('name', 'Act name is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('price', 'Should be a price format (ex. 12.34)').isFloat(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, description, price } = req.body;

    try {
      const act = await Act.create({
        name,
        description,
        price,
      });
      return res.status(200).send(act);
    } catch (e) {
      console.error(e);
      return res.status(500).send({ message: 'Server error' });
    }
  }
);

module.exports = actsRouter;
