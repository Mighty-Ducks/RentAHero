// get localStorage on load. Dispatch to redux store upon entering website.
const getStorage = JSON.parse(localStorage.getItem('cart')) || [];

const inputs = document.querySelectorAll('input[type=checkbox]');

// acts in localStorage have their boxes checked on load.
const checkInputs = () => {
  inputs.forEach((input) => {
    const findAct = getStorage.find((act) => act.id === input.id);
    if (findAct) input.checked = true;
  });
};

// update localStorage when boxes/acts are checked and checked off.
const updateLocalStorage = () => {
  const updatedStorage = [];
  inputs.forEach((input) => {
    if (input.checked) acts.push({ id: input.value });
  });
  localStorage.setItem('cart', JSON.stringify(updatedStorage));
};

// after placing an order, clear cart along with local storage.
const clearLocalStorage = () => localStorage.clear();

module.exports = {
  getStorage,
  checkInputs,
  updateLocalStorage,
  clearLocalStorage,
};
