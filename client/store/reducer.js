import { combineReducers } from 'redux';

const { TYPES } = require('./types');

const initialHeroState = {
  heroesList: [],
  hero: {},
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

const reducer = combineReducers({
  heroes: heroesReducer,
  acts: actsReducer,
});

export default reducer;
