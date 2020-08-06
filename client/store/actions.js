const axios = require('axios');
const { TYPES } = require('./types');

export const setLoggedIn = (flag) => {
  return {
    type: TYPES.SET_LOGGED_IN,
    payload: flag,
  };
};

export const setHeroes = (heroes) => {
  return {
    type: TYPES.SET_HEROES,
    payload: heroes,
  };
};

export const setTotalHeroes = (heroesTotal) => {
  return {
    type: TYPES.SET_TOTAL_HEROES,
    heroesTotal,
  };
};

export const fetchHeroes = (page) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/superheroes/page/${page}`);
    dispatch(setHeroes(data.heroes));
    dispatch(setTotalHeroes(data.count));
  };
};

export const setHero = (hero) => {
  return {
    type: TYPES.SET_HERO,
    payload: hero,
  };
};

export const fetchHero = (id) => async (dispatch) => {
  const { data } = await axios.get(`/api/superheroes/${id}`);

  return dispatch(setHero(data));
};

export const setActs = (acts) => {
  return {
    type: TYPES.SET_ACTS,
    payload: acts,
  };
};

export const fetchActs = () => async (dispatch) => {
  const { data } = await axios.get('/api/acts/');

  return dispatch(setActs(data));
};

export const setCart = (cart) => {
  return {
    type: TYPES.SET_CART,
    payload: cart,
  };
};

export const fetchCart = () => async (dispatch) => {
  const { data } = await axios.get('/api/cart/');

  return dispatch(setCart(data));
};
