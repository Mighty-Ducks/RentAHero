const categoriesRouter = require('express').Router();
const { Category, Superhero } = require('../../db/models/models_index.js');

// get all categories
categoriesRouter.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Superhero],
    });

    res.status(200).send(categories);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// get individual category
categoriesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id, {
      include: [Superhero],
    });

    if (category) {
      res.status(200).send(category);
    } else {
      res.status(404).send({ message: `Category id: ${id} not found.` });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// update/edit category
categoriesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findByPk(id);

    if (category) {
      const updatedCategory = await category.update({
        name,
      });
      res.status(200).send(updatedCategory);
    } else {
      res.status(404).send({ message: `Category id: ${id} not found.` });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// delete a category
categoriesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    if (category) {
      category.destroy();
      res
        .status(204)
        .send({ message: `Category id: ${id} succesfully deleted.` });
    } else {
      res.status(404).send({ message: `Category id: ${id} not found.` });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

// add a category
categoriesRouter.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({
      name,
    });
    res.status(200).send(category);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = categoriesRouter;
