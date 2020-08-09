const axios = require('axios');
const { TYPES } = require('./types');

export const setUser = ({ user, admin }) => {
  return {
    type: TYPES.SET_USER,
    payload: { user, admin },
  };
};

export const setLoggedIn = (flag) => {
  return {
    type: TYPES.SET_LOGGED_IN,
    payload: flag,
  };
};

export const setError = (err) => {
  return {
    type: TYPES.SET_ERROR,
    payload: err,
  };
};

export const postUser = (email, password, flag) => {
  return async (dispatch) => {
    try {
      await axios.post('/api/users/login', {
        email,
        password,
      });

      dispatch(setUser({ email }));
      dispatch(setLoggedIn(flag));
      dispatch(setError(''));
      return true;
    } catch (e) {
      dispatch(setError(e.response.data.message));
      return false;
    }
  };
};

export const logInWithSession = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/users/session');

    if (data) {
      dispatch(setUser({ user: data.email, admin: data.admin }));
      dispatch(setLoggedIn(true));
    } else {
      dispatch(setLoggedIn(false));
    }
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

export const setSearchHeroes = (searchResults) => {
  return {
    type: TYPES.SET_SEARCH_HEROES,
    searchResults,
  };
};

export const setSearchTotal = (searchTotal) => {
  return {
    type: TYPES.SET_SEARCH_TOTAL,
    searchTotal,
  };
};

export const searchHeroes = (term, page) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/search/${term}/page/${page}`);
    dispatch(setSearchHeroes(data.searchResults));
    dispatch(setSearchTotal(data.searchTotal));
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

export const createHero = (newHero) => {
  return {
    type: TYPES.CREATE_HERO,
    payload: newHero,
  };
};

export const postHero = (newHero) => async (dispatch) => {
  const { data } = await axios.post('/api/superheroes/', newHero);

  return dispatch(createHero(data));
};

export const updHero = (updatedHero) => {
  return {
    type: TYPES.UPDATE_HERO,
    payload: updatedHero,
  };
};

export const updateHero = (id, payload) => async (dispatch) => {
  const { data } = await axios.put(`/api/superheroes/${id}`, payload);

  return dispatch(updHero(data));
};

export const removeHero = (id) => {
  return {
    type: TYPES.DELETE_HERO,
    payload: id,
  };
};

export const deleteHero = (id) => async (dispatch) => {
  await axios.delete(`/api/superheroes/${id}`);

  return dispatch(removeHero(id));
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
  const { data } = await axios.get(`/api/cart`);

  return dispatch(setCart(data));
};

export const setItem = (item) => {
  return {
    type: TYPES.CREATE_ITEM,
    payload: item,
  };
};

export const createItem = (item) => async (dispatch) => {
  const { data } = await axios.post('/api/cart/item', item);

  return dispatch(setItem(data));
};

export const removeItem = (id) => async (dispatch) => {
  await axios.delete(`/api/cart/item/${id}`);
  const { data } = await axios.get(`/api/cart`);

  return dispatch(setCart(data));
};

export const setCategories = (categoriesList) => {
  return {
    type: TYPES.SET_CATEGORIES,
    categoriesList,
  };
};

export const setCategoryHeroes = (heroes) => {
  return {
    type: TYPES.SET_CATEGORIES_HEROES,
    heroes,
  };
};

export const setCategoryHeroesTotal = (categoryTotal) => {
  return {
    type: TYPES.SET_CATEGORIES_HEROES_TOTAL,
    categoryTotal,
  };
};

export const fetchCategories = () => async (dispatch) => {
  const { data } = await axios.get(`/api/categories`);

  return dispatch(setCategories(data));
};

export const fetchCategoryHeroes = (categoryName, page) => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `/api/categories/${categoryName}/page/${page}`
    );
    dispatch(setCategoryHeroes(data.categoryHeroes));
    dispatch(setCategoryHeroesTotal(data.categoryHeroesTotal));
  };
};
