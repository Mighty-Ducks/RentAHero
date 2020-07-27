const { TYPES } = require('./types');

const initialState = {
  heroes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_HEROES:
      return {
        ...state,
        heroes: action.heroes,
      };
    default:
      return state;
  }
};

export default reducer;
