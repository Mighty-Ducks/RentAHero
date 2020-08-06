import { combineReducers } from 'redux';

const { TYPES } = require('./types');

const initialHeroState = {
  heroesList: [],
  hero: {},
};

const initialUserState = {
  email: '',
  loggedIn: false,
};

const heroesReducer = (state = initialHeroState, action) => {
  switch (action.type) {
    case TYPES.SET_HEROES:
      return {
        ...state,
        heroesList: action.payload,
      };
    case TYPES.SET_HERO:
      return {
        ...state,
        hero: action.payload,
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
        loggedIn: action.flag,
      };
    default:
      return state;
  }
};

const initialStoreState = {
  page: 0,
};

const pageReducer = (state = initialStoreState, action) => {
  switch (action.type) {
    case TYPES.SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  heroes: heroesReducer,
  users: usersReducer,
  acts: actsReducer,
  page: pageReducer,
});

export default reducer;
