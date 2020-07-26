import React from 'react';
import { render } from 'react-dom';
import App from './components/app';

const app = document.querySelector('#app');

render(<App />, app, () => {
  console.log('App rendered!');
});
