import { combineReducers } from 'redux';

const { TYPES } = require('./types');

const initialHeroState = {
  heroesList: [],
  heroesTotal: 0,
  hero: {},
};

const initialUserState = {
  email: '',
  loggedIn: false,
};

const initialCartState = {
  cart: [],
};

const heroesReducer = (state = initialHeroState, action) => {
  switch (action.type) {
    case TYPES.SET_HEROES:
      return {
        ...state,
        heroesList: action.payload,
      };
    case TYPES.SET_TOTAL_HEROES:
      return {
        ...state,
        heroesTotal: action.heroesTotal,
      };
    case TYPES.SET_HERO:
      return {
        ...state,
        hero: action.payload,
      };
    case TYPES.CREATE_HERO:
      return {
        ...state,
        heroesList: [action.payload, ...state.heroesList],
      };
    default:
      return state;
  }
};

const initialActState = {
  actsList: [],
  act: {},
};

const actsReducer = (state = initialActState, action) => {
  switch (action.type) {
    case TYPES.SET_ACTS:
      return {
        ...state,
        actsList: action.payload,
      };
    default:
      return state;
  }
};

const usersReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case TYPES.SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload,
      };
    default:
      return state;
  }
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case TYPES.SET_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  heroes: heroesReducer,
  users: usersReducer,
  acts: actsReducer,
  cart: cartReducer,
});

export default reducer;
