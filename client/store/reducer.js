import { combineReducers } from 'redux';

const TYPES = require('./types');

const initialState = {
  heroes: [],
  hero: {},
};

const heroesReducer = (state = initialState, action) => {
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
