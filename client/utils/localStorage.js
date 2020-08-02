// get localStorage on load. Dispatch to redux store upon entering website.
const getStorage = JSON.parse(localStorage.getItem('cart')) || [];

const inputs = document.querySelectorAll('input[type=checkbox]');

// acts in localStorage have their boxes checked on load.
const checkInputs = () => {
  inputs.forEach((input) => {
    inputs.checked = getStorage.find((act) => act.id === input.id);
  });
};

// update localStorage when boxes/acts are checked and checked off.
const updateLocalStorage = (obj) => {
  const updatedStorage = [];
  inputs.forEach((input) => {
    if (input.checked) updatedStorage.push(obj);
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
