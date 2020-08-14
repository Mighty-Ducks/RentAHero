import { combineReducers } from 'redux';

const { TYPES } = require('./types');

const initialHeroState = {
  heroesList: [],
  heroesTotal: 0,
  hero: {},
};

const initialCartState = {
  cart: [],
};

const initialSearchState = {
  heroes: [],
  heroesTotal: 0,
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
        hero: action.payload,
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
  user: {
    firstName: '',
    lastName: '',
    street: '',
    state: '',
    zip: '',
  },
  usersList: [],
  loggedIn: false,
  error: '',
  loading: true,
  orders: [],
};

const usersReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case TYPES.SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case TYPES.UPDATE_USER:
      return {
        ...state,
        usersList: state.usersList.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        user: action.payload,
        loading: false,
      };
    case TYPES.DELETE_USER:
      return {
        ...state,
        usersList: state.usersList.filter((user) => user.id !== action.payload),
      };
    case TYPES.SET_USERS:
      return {
        ...state,
        usersList: action.payload,
        loading: false,
      };
    case TYPES.SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload,
        loading: false,
      };
    case TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case TYPES.SET_USER_ORDERS:
      return {
        ...state,
        orders: action.payload,
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

const initialEventState = {
  heroId: '',
  events: [],
};

const eventReducer = (state = initialEventState, action) => {
  switch (action.type) {
    case TYPES.SET_EVENT_HEROID:
      return {
        ...state,
        heroId: action.payload,
      };
    case TYPES.SET_EVENTS:
      return {
        ...state,
        events: action.payload,
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
  event: eventReducer,
});

export default reducer;
