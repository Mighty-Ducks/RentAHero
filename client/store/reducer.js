const TYPES = require('./types');

const initialState = {
  heroes: [],
  hero: {},
};

const reducer = (state = initialState, action) => {
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

export default reducer;
