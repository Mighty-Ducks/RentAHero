const { Superhero, Act, Category, User } = require('./models/models_index');

const superheroes = [
  {
    name: 'Batman',
    imgURL:
      'https://images-na.ssl-images-amazon.com/images/I/514wMrxRESL._AC_SL1350_.jpg',
    description: 'I am vengeance, I am the night, I am Batman!',
  },
  {
    name: 'Superman',
    imgURL:
      'https://i.pinimg.com/originals/3d/0e/cd/3d0ecdbd9a4932fd3f810a9f45bfd893.jpg',
    description: 'Truth, justice and the American way',
  },
  {
    name: 'Captian America',
    imgURL:
      'https://cdn1.vectorstock.com/i/1000x1000/12/00/captain-america-logo-vector-4671200.jpg',
    description:
      'I believe in an idea, an idea that a single individual who has the right heart and the right mind that is consumed with a single purpose, that one man can win a war. Give that one man a group of soldiers with the same conviction, and you can change the world.',
  },
];

const acts = [
  {
    name: 'Super power show',
    description:
      'One hour show that will blow your mind! Presenting all abilities!!!',
    price: 1000,
  },
  {
    name: 'Gotham city ride',
    description: 'One hour tour of Gotham city in the Batmobile!!!',
    price: 2000,
  },
];

const categories = [
  {
    name: 'Male',
  },
  {
    name: 'Female',
  },
];

const initialData = async ({ force = false }) => {
  if (force) {
    await Promise.all([
      superheroes.map((superhero) => Superhero.create(superhero)),
      acts.map((act) => Act.create(act)),
      categories.map((category) => Category.create(category)),
    ]);
  }
};

module.exports = initialData;
