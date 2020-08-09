const superheroesRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const { Act, Superhero, Category } = require('../../db/models/models_index.js');

// app.use('/api/superheroes', superheroesRouter) in routes_index.js

// get all superheroes
superheroesRouter.get('/page/:page?', async (req, res) => {
  const limit = 6;
  let offset = 0;
  try {
    await Superhero.findAndCountAll().then(async (data) => {
      const { page } = req.params;
      offset = limit * (page - 1);
      await Superhero.findAll({
        limit,
        offset,
        include: [
          {
            model: Act,
          },
          {
            model: Category,
          },
        ],
      }).then((heroes) => {
        return res.status(200).send({ count: data.count, heroes });
      });
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// get individual superhero
superheroesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const superhero = await Superhero.findByPk(id, {
      include: [Act],
    });

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
superheroesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, imgURL, description, actIds, categoryIds } = req.body;
  const updParams = {};

  if (name) updParams.name = name;
  if (imgURL) updParams.imgURL = imgURL;
  if (description) updParams.description = description;
  if (actIds) updParams.actIds = actIds;
  if (categoryIds) updParams.categoryIds = categoryIds;

  try {
    const superhero = await Superhero.findByPk(id, {
      include: [Act],
    });

    // find all acts that are in the actId array from req.body.
    const updatedActs = await Act.findAll({
      where: {
        id: actIds || null,
      },
    });

    const updatedCategories = await Category.findAll({
      where: {
        id: categoryIds || null,
      },
    });
    if (superhero) {
      const updatedSuperhero = await superhero.update(updParams);

      if (updatedActs) {
        await updatedSuperhero.setActs(updatedActs);
      }

      if (updatedCategories) {
        await updatedSuperhero.setCategories(updatedCategories);
      }

      // then FIND the same hero AGAIN after the acts are updated. The hero object above doesn't include the updated acts
      const findSuperhero = await Superhero.findByPk(id, {
        include: [
          {
            model: Act,
          },
          {
            model: Category,
          },
        ],
      });
      res.status(200).send(findSuperhero);
    } else {
      res.status(404).send({ message: `Superhero id: ${id} not found.` });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

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

    const { name, imgURL, description, actIds, categoryIds } = req.body;

    try {
      const superhero = await Superhero.create({
        name,
        imgURL,
        description,
      });
      // use magic method to add Acts when creating a new Hero
      await superhero.addActs(actIds);
      await superhero.addCategories(categoryIds);
      // then FIND the same hero AGAIN after the acts are added. The superhero object above doesn't include the added acts.
      const findSuperhero = await Superhero.findByPk(superhero.id, {
        include: [
          {
            model: Act,
          },
          {
            model: Category,
          },
        ],
      });
      res.status(200).send(findSuperhero);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Server error' });
    }
  }
);

module.exports = superheroesRouter;
