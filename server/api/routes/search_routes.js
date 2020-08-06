const searchRouter = require('express').Router();
const { Op } = require('sequelize');
const { Act, Superhero, Category } = require('../../db/models/models_index.js');

// search all superheroes
searchRouter.get('/:term/page/:page', async (req, res) => {
  const limit = 12;
  let offset = 0;
  try {
    await Superhero.findAndCountAll().then(async (data) => {
      const { page, term } = req.params;
      offset = limit * (page - 1);
      await Superhero.findAll({
        limit,
        offset,
        where: {
          name: {
            [Op.iLike]: `${term}%`,
          },
        },
        include: [
          {
            model: Act,
          },
          {
            model: Category,
          },
        ],
      }).then((heroes) => {
        return res
          .status(200)
          .send({ searchResults: heroes, searchTotal: data.count });
      });
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = searchRouter;
