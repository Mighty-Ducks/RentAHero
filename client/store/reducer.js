import { combineReducers } from 'redux';

const { TYPES } = require('./types');

const initialHeroState = {
  heroesList: [],
  heroesTotal: 0,
  hero: {},
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
    case TYPES.UPDATE_HERO:
      return {
        ...state,
        heroesList: state.heroesList.map((hero) =>
          hero.id === action.payload.id ? action.payload : hero
        ),
      };
    case TYPES.DELETE_HERO:
      return {
        ...state,
        heroesList: state.heroesList.filter(
          (hero) => hero.id !== action.payload
        ),
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

const initialUserState = {
  user: {},
  loggedIn: false,
  error: '',
};

const usersReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case TYPES.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case TYPES.SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialCartState = {
  cart: [],
  newItem: {},
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case TYPES.SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case TYPES.CREATE_ITEM:
      return {
        ...state,
        newItem: action.payload,
      };
    default:
      return state;
  }
};

const initialSearchState = {
  heroes: [],
  heroesTotal: 0,
};

const searchReducer = (state = initialSearchState, action) => {
  switch (action.type) {
    case TYPES.SET_SEARCH_HEROES:
      return {
        ...state,
        heroes: action.searchResults,
      };
    case TYPES.SET_SEARCH_TOTAL:
      return {
        ...state,
        heroesTotal: action.searchTotal,
      };
    default:
      return state;
  }
};

const initialCategoriesState = {
  categoriesList: [],
  heroes: [],
  categoryTotal: 0,
};

const categoriesReducer = (state = initialCategoriesState, action) => {
  switch (action.type) {
    case TYPES.SET_CATEGORIES:
      return {
        ...state,
        categoriesList: action.categoriesList,
      };
    case TYPES.SET_CATEGORIES_HEROES:
      return {
        ...state,
        heroes: action.heroes,
      };
    case TYPES.SET_CATEGORIES_HEROES_TOTAL:
      return {
        ...state,
        categoryTotal: action.categoryTotal,
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
  searchResults: searchReducer,
  categories: categoriesReducer,
});

export default reducer;
