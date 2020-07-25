// app.use for all the diffrent routes
const apiRouter = require('express').Router();
const path = require('path');
const { Superhero, Category } = require('../db/models/models_index.js');

apiRouter.get('/', (req, res) => { // send index.html to root directory
    res.sendFile(path.join(__dirname, '../index.html'));
})

// get all superheroes
apiRouter.get('/api/superheroes', async (req, res) => {
    const superheroes = await Superhero.findAll();

    if(!superheroes){
        res.status(404).send({ message: 'Superheroes not found' })
    } else {
        res.send({ superheroes });
    } 
});

// get individual superhero
apiRouter.get('/api/superheroes/:id', async (req, res) => {
    const { id } = req.params;

    const superhero = await Superhero.findAll({
        where: { id: id }
    });

    if(!superhero){
        res.status(404).send({ message: `Superhero id: ${id} not found.` })
    } else {
        res.send({ superhero });
    }
});

// update/edit superhero
apiRouter.put('/api/superheroes/:id', (req, res) => {
    const { id } = req.params;
    const { availability, categoryId, description, image, name, powers, offerings, price } = req.body; // review to agree on properties for superhero
    
    const inputCheck = (inputs) => { //check if inputs are empty. need validation on front-end too
        let emptyInput = false;
        for(let key in inputs){
            if(inputs[key] === null || inputs[key] === ''){
                emptyInput = false;
            } else {
                emptyInput = true;
            }
            return emptyInput;
        }
    }

    const superhero = await Superhero.findByPk(id);

    if(!inputCheck(req.body)){ // if an input is empty send error
        res.status(400).send({ message: `Cannot leave any fields empty.` });
    } else if(!superhero){
        res.status(404).send({ message: `Superhero id: ${id} not found.`})
    } else {
        const updatedSuperhero = await superhero.update({
            availability: availability,
            categoryId: categoryId, // requires association Superhero.belongsTo(Category) & Category.hasMany(Superhero)
            description: description,
            image: image,
            name: name,
            offerings: offerings, // for example, superman can offer to fly you around the city, batman can take you on a ride in the batmobile
            powers: powers,
            price: price,
        })
        res.send({ updatedSuperhero });
    }
})

// delete a superhero
apiRouter.delete('/api/superheroes/:id', (req, res) => {
    const { id } = req.params;

    const superhero = await Superhero.findByPk(id);

    if(!superhero){
        res.status(404).send({ message: `Superhero id: ${id} not found.`})
    } else {
        const deletedSuperhero = await superhero.destroy({
            where: { id: id }
        })
        res.send({ deletedSuperhero });
    }
});

// add a superhero
apiRouter.post('/api/superheroes', (req, res) => {
    const { availability, categoryId, description, image, name, powers, offerings, price  } = req.body;
    
    const inputCheck = (inputs) => { //check if inputs are empty. need validation on front-end too
        let emptyInput = false;
        for(let key in inputs){
            if(inputs[key] === null || inputs[key] === ''){
                emptyInput = false;
            } else {
                emptyInput = true;
            }
            return emptyInput;
        }
    }

    if(!inputCheck(req.body)){ // if an input empty send error
        res.send({ message: `Cannot leave any fields empty.` })
    } else {
        const superhero = await Superhero.create({
            availability: availability,
            categoryId: categoryId, // requires association Superhero.belongsTo(Category) & Category.hasMany(Superhero)
            description: description,
            image: image,
            name: name,
            offerings: offerings, // for example, superman can offer to fly you around the city, batman can take you on a ride in the batmobile
            powers: powers,
            price: price,
        });
        
        res.send({superhero});
    }
})

module.exports = apiRouter;