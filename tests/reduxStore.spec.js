import * as actions from '../client/store/actions';
import * as types from '../client/store/types';

describe('actions', () => {
  it('Should create an action to set heroes', () => {
    const superheroes = [
      {
        name: 'Batman',
        imgUrl: '',
        description: 'I am Batman!',
        popularity: 3,
      },
    ];
    const expectedAction = {
      type: types.TYPES.SET_HEROES,
      payload: superheroes,
    };
    expect(actions.setHeroes(superheroes)).toEqual(expectedAction);
  });
  it('Should create an action to set loggedIn status', () => {
    const flag = true;

    const expectedAction = {
      type: types.TYPES.SET_LOGGED_IN,
      flag,
    };
    expect(actions.setLoggedIn(flag)).toEqual(expectedAction);
  });
});
