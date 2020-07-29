import { createStore, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import reducer from './reducer';

const middleware = [
  thunks,
  createLogger({
    collapsed: true,
  }),
];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
