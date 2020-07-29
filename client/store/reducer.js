import { combineReducers } from 'redux';

const { TYPES } = require('./types');

const initialHeroState = {
  heroes: [],
  hero: {},
};

const heroesReducer = (state = initialHeroState, action) => {
  switch (action.type) {
    case TYPES.SET_HEROES:
      return {
        ...state,
        heroes: action.payload,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  heroes: heroesReducer,
});

export default reducer;
