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

const reducer = combineReducers({
  heroes: heroesReducer,
  users: usersReducer,
});

export default reducer;
