const hash = require('../../utilities/index');

const wolverine = {
  hero: {
    name: 'Wolverine',
    imgURL: 'https://avatarfiles.alphacoders.com/123/thumb-123732.jpg',
    description: `'I'm the best there is at what I do, and what I do isn't very nice.'`,
  },
  acts: [
    {
      name: 'Wolverine motorcycle ride',
      description: 'One hour ride with me',
      price: 1000,
    },
  ],
  categories: [
    {
      name: 'Male',
    },
    {
      name: 'Human',
    },
  ],
};

const superman = {
  hero: {
    name: 'Superman',
    imgURL:
      'https://i.pinimg.com/originals/3d/0e/cd/3d0ecdbd9a4932fd3f810a9f45bfd893.jpg',
    description: 'Truth, justice and the American way',
  },
  acts: [
    {
      name: 'Flying around the world',
      description: 'One hour with me exploring the world.',
      price: 5000,
    },
  ],
  categories: [
    {
      name: 'Male',
    },
    {
      name: 'Human',
    },
  ],
};

const batman = {
  hero: {
    name: 'Batman',
    imgURL:
      'https://images-na.ssl-images-amazon.com/images/I/514wMrxRESL._AC_SL1350_.jpg',
    description: 'I am vengeance, I am the night, I am Batman!',
  },
  acts: [
    {
      name: 'Gotham city ride',
      description: 'One hour tour of Gotham city in the Batmobile!!!',
      price: 2000,
    },
  ],
  categories: [
    {
      name: 'Male',
    },
    {
      name: 'Human',
    },
  ],
};

const captainAmerica = {
  hero: {
    name: 'Captian America',
    imgURL:
      'https://upload.wikimedia.org/wikipedia/commons/8/8a/Bouclier_Captain_America_1018.png',
    description:
      'I believe in an idea, an idea that a single individual who has the right heart and the right mind that is consumed with a single purpose, that one man can win a war. Give that one man a group of soldiers with the same conviction, and you can change the world.',
  },
  acts: [],
  categories: [
    {
      name: 'Male',
    },
    {
      name: 'Human',
    },
  ],
};

const wonderWoman = {
  hero: {
    name: 'Wonder Woman',
    imgURL:
      'https://cdn.dribbble.com/users/318663/screenshots/4003999/ashley-wonderwoman-dribbble.jpg',
    description: 'I will fight for those who cannot fight for themselves.',
  },
  acts: [],
  categories: [
    {
      name: 'Female',
    },
    {
      name: 'Non-Human',
    },
  ],
};

const elastigirl = {
  hero: {
    name: 'Elastigirl',
    imgURL:
      'https://celebrationspress.com/wp-content/uploads/2018/09/092418elast.jpg',
    description: 'Settle down, are you kidding?',
  },
  acts: [],
  categories: [
    {
      name: 'Female',
    },
    {
      name: 'Non-Human',
    },
  ],
};

const spiderman = {
  hero: {
    name: 'Spiderman',
    imgURL: 'https://avatarfiles.alphacoders.com/153/153179.png',
    description: 'With great power comes great responsibility',
  },
  acts: [
    {
      name: 'NYC Building ride',
      description: 'One hour tour of nyc city from the rooftops!!!',
      price: 2000,
    },
  ],
  categories: [
    {
      name: 'Male',
    },
    {
      name: 'Human',
    },
  ],
};

const deadpool = {
  hero: {
    name: 'Deadpool',
    imgURL: 'https://avatarfiles.alphacoders.com/129/thumb-129487.jpg',
    description: 'Bad Deadpool... Good Deadpool!',
  },
  acts: [],
  categories: [
    {
      name: 'Male',
    },
    {
      name: 'Human',
    },
  ],
};

const blackWidow = {
  hero: {
    name: 'Black Widow',
    imgURL: 'https://avatarfiles.alphacoders.com/107/thumb-107839.jpg',
    description: `'Let's finish the job.'`,
  },
  acts: [],
  categories: [
    {
      name: 'Female',
    },
    {
      name: 'Human',
    },
  ],
};

const catWoman = {
  hero: {
    name: 'Catwoman',
    imgURL:
      'https://i.pinimg.com/originals/cb/d5/a4/cbd5a4f8087a308a53c71bdf5d6b165e.png',
    description: `Honey I'm Home!`,
  },
  acts: [],
  categories: [
    {
      name: 'Female',
    },
    {
      name: 'Human',
    },
  ],
};

const ironMan = {
  hero: {
    name: 'Iron Man',
    imgURL: 'https://avatarfiles.alphacoders.com/217/thumb-217097.jpg',
    description: `Give me a scotch. I'm starving.`,
  },
  acts: [],
  categories: [
    {
      name: 'Male',
    },
    {
      name: 'Human',
    },
  ],
};

const superheroes = [
  wolverine,
  superman,
  batman,
  captainAmerica,
  wonderWoman,
  elastigirl,
  spiderman,
  deadpool,
  blackWidow,
  catWoman,
  ironMan,
];

const acts = [
  {
    name: 'Super power show',
    description:
      'One hour show that will blow your mind! Presenting all abilities!!!',
    price: 1000,
  },
  {
    name: 'A battle show ',
    description: 'One hour kicking bad guys ass!',
    price: 3000,
  },
];

const categories = [
  {
    name: 'Male',
  },
  {
    name: 'Female',
  },
  {
    name: 'Human',
  },
  {
    name: 'Non-Human',
  },
];

const users = [
  {
    firstName: 'Judith',
    lastName: 'Blinder',
    email: 'me@judith.com',
    password: hash('112233'),
    admin: true,
  },
  {
    firstName: 'Dmytro',
    lastName: 'Lypovetskiy',
    email: 'me@dmytro.com',
    password: hash('112233'),
    admin: true,
  },
  {
    firstName: 'Abimanyu',
    lastName: 'Saridjo',
    email: 'me@abima.com',
    password: hash('112233'),
    admin: true,
  },
];

module.exports = { superheroes, acts, categories, users };
