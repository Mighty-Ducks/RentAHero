import { createStore, applyMiddleware } from 'redux';
import { thunks } from 'redux-thunk';
import reducer from './reducer';
import { setHeroes } from './actions';

const store = createStore(reducer, applyMiddleware(thunks));

export { store, setHeroes }; // Exporting all store functions from one file.
