const superheroesRouter = require('express').Router();
const { Superhero } = require('../db/models/models_index.js');

// app.use('/api/superheroes', superheroesRouter) in routes_index.js

// get all superheroes
superheroesRouter.get('/', async (req, res) => {
    
    try {
        const superheroes = await Superhero.findAll();
        res.send({ superheroes });
    } catch(e) {
        console.log(e);
        res.status(200).send({ message: 'Superheroes not found' });
    }
});

// get individual superhero
superheroesRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const superhero = await Superhero.findByPk(id);
        res.send({ superhero });
    } catch (e) {
        console.log(e);
        res.status(200).send({ message: `Superhero id: ${id} not found.` })
    }
});

// update/edit superhero
superheroesRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { availability, categoryId, description, image, name, powers, offerings, price } = req.body; // review to agree on properties for superhero

    try {
        const superhero = await Superhero.findByPk(id);
        const updatedSuperhero = await superhero.update({
            availability,
            categoryId, // requires association Superhero.belongsTo(Category) & Category.hasMany(Superhero)
            description,
            image,
            name,
            offerings, // for example, superman can offer to fly you around the city, batman can take you on a ride in the batmobile
            powers,
            price,
        })
        res.send({ updatedSuperhero });
    } catch (e) {
        console.log(e);
        res.status(200).send({ message: `Superhero id: ${id} not found.`})

    }
})

// delete a superhero
superheroesRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const superhero = await Superhero.findByPk(id);
        superhero.destroy();
        res.sendStatus(200);
    } catch(e) {
        console.log(e);
        res.status(200).send({ message: `Superhero id: ${id} not found.`})
    }
});

// add a superhero
superheroesRouter.post('/', async (req, res) => {
    const { availability, categoryId, description, image, name, powers, offerings, price  } = req.body;

    try {
        const superhero = await Superhero.create({
            availability,
            categoryId, // requires association Superhero.belongsTo(Category) & Category.hasMany(Superhero)
            description,
            image,
            name,
            offerings, // for example, superman can offer to fly you around the city, batman can take you on a ride in the batmobile
            powers,
            price,
        });
        res.send({superhero});
    } catch(e) {
        console.log(e);
    }
})

module.exports = superheroesRouter;