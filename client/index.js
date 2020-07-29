import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import store from './store/store';

const app = document.querySelector('#app');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  app,
  () => {
    console.log('App rendered!');
  }
);
