const axios = require('axios');
const { TYPES } = require('./types');

export const setHeroes = (heroes) => {
  return {
    type: TYPES.SET_HEROES,
    payload: heroes,
  };
};

export const fetchHeroes = () => async (dispatch) => {
  const { data } = await axios.get('/api/superheroes/');

  return dispatch(setHeroes(data));
};
