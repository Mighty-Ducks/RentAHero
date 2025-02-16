const axios = require('axios');
const { TYPES } = require('./types');

export const setPayment = (paymentInfo) => {
  return {
    type: TYPES.SET_PAYMENT,
    payload: paymentInfo,
  };
};

export const postPayment = (paymentInfo) => async (dispatch) => {
  const { data } = await axios.post('/api/payment/', paymentInfo);

  return dispatch(setPayment(data));
};

export const setMe = (me) => {
  return {
    type: TYPES.SET_ME,
    payload: me,
  };
};

export const setUser = (user) => {
  return {
    type: TYPES.SET_USER,
    payload: user,
  };
};

export const fetchUser = (id) => async (dispatch) => {
  const { data } = await axios.get(`/api/users/${id}`);

  return dispatch(setUser(data));
};

export const updUser = (updatedUser) => {
  return {
    type: TYPES.UPDATE_USER,
    payload: updatedUser,
  };
};

export const updateUser = (id, payload, me) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/users/${id}`, payload);

    dispatch(updUser(data));
    if (id === me.id) {
      dispatch(setMe(data));
    }
  };
};

export const removeUser = (id) => {
  return {
    type: TYPES.DELETE_USER,
    payload: id,
  };
};

export const deleteUser = (id) => async (dispatch) => {
  await axios.delete(`/api/users/${id}`);

  return dispatch(removeUser(id));
};

export const setUsers = (users) => {
  return {
    type: TYPES.SET_USERS,
    payload: users,
  };
};

export const fetchUsers = () => async (dispatch) => {
  const { data } = await axios.get('/api/users/');

  return dispatch(setUsers(data));
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

// login
export const postUser = (email, password) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });

      await dispatch(setMe(data));
      dispatch(setUser(data));
      dispatch(setLoggedIn(true));
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
      dispatch(setMe(data));
      dispatch(setUser(data));
      dispatch(setLoggedIn(true));
    } else {
      dispatch(setLoggedIn(false));
    }
  };
};

export const setLoggedOut = () => {
  return async (dispatch) => {
    await axios.put('/api/users/logout');

    const user = {
      firstName: '',
      lastName: '',
      street: '',
      state: '',
      zip: '',
    };

    dispatch(setLoggedIn(false));
    dispatch(setMe(user));
    dispatch(setUser(user));
  };
};

export const registerUser = ({ firstName, lastName, email, password }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/users/register', {
        firstName,
        lastName,
        email,
        password,
      });
      if (data) {
        dispatch(setMe(data));
        dispatch(setUser(data));
        dispatch(setLoggedIn(true));
      }
    } catch (e) {
      dispatch(setError(e.response.data.message));
    }
  };
};

export const setUserOrders = (orders) => {
  return {
    type: TYPES.SET_USER_ORDERS,
    payload: orders,
  };
};

export const fetchUserOrders = (id) => async (dispatch) => {
  const { data } = await axios.get(`/api/users/orders/${id}`);

  return dispatch(setUserOrders(data));
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

export const fetchNewHeroes = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/superheroes/new`);
    dispatch(setHeroes(data));
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

export const setCartId = (cartId) => {
  return {
    type: TYPES.SET_CART_ID,
    payload: cartId,
  };
};

export const setCart = (cart) => {
  return {
    type: TYPES.SET_CART,
    payload: cart,
  };
};

export const fetchCart = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/cart`);

    dispatch(setCart(data));
    dispatch(setCartId(data[0].cartId));
  };
};

export const updateCart = (id) => async (dispatch) => {
  await axios.put(`/api/cart/${id}`);

  return dispatch(setCart([]));
};

export const setEventHeroId = (heroId) => {
  return {
    type: TYPES.SET_EVENT_HEROID,
    payload: heroId,
  };
};

export const setEvents = (events) => {
  return {
    type: TYPES.SET_EVENTS,
    payload: events,
  };
};

export const fetchEvents = (heroId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/event/${heroId}`);

    dispatch(setEventHeroId(heroId));
    dispatch(setEvents(data));
  };
};

export const createEvent = (heroId, datetime, itemId) => async (dispatch) => {
  await axios.post('/api/event', { heroId, datetime, itemId });

  return dispatch(fetchEvents(heroId));
};

export const setItem = (item) => {
  return {
    type: TYPES.CREATE_ITEM,
    payload: item,
  };
};

export const createItem = (item) => {
  return async (dispatch) => {
    const { data } = await axios.post('/api/cart/item', item);

    dispatch(setItem(data));
    dispatch(createEvent(item.heroId, item.datetime, data.id));
    dispatch(fetchCart(data.cartId));
  };
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
