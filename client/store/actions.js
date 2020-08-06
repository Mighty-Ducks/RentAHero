const axios = require('axios');
const { TYPES } = require('./types');

export const setLoggedIn = (flag) => {
  return {
    type: TYPES.SET_LOGGED_IN,
    flag,
  };
};

export const setHeroes = (heroes) => {
  return {
    type: TYPES.SET_HEROES,
    payload: heroes,
  };
};

export const fetchHeroes = (page) => async (dispatch) => {
  const { data } = await axios.get(`/api/superheroes/page/${page}`);

  return dispatch(setHeroes(data));
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

export const setPage = (page) => {
  return {
    type: TYPES.SET_PAGE,
    payload: page,
  };
};
