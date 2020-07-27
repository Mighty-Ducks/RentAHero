const TYPES = {
  SET_HEROES: 'SET_HEROES',
};

const setHeroes = (heroes) => ({ type: TYPES.SET_HEROES, heroes });

export { TYPES, setHeroes };
