import TYPES from './types';

export const setHeroes = (heroes) => {
  return {
    type: TYPES.SET_HEROES,
    payload: heroes,
  };
};

export const fetchHeroes = () => (dispatch) => {
  const { data } = {
    data: [
      {
        name: 'Iron man',
        avatar:
          'https://www.sideshow.com/storage/product-images/903752/iron-man-mark-vii_marvel_silo.png',
        power: 'money',
        pricePerHr: '13',
        bookLink: 'www.google.com',
      },
      {
        name: 'Hacker man',
        avatar:
          'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/hackerman-tary-kristina.jpg',
        power: 'money',
        pricePerHr: '13',
        bookLink: 'www.google.com',
      },
    ],
  };

  return dispatch(setHeroes(data));
};
