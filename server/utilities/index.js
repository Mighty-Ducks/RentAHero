const hash = (str) => {
  let hashedStr = '';

  for (let i = 0; i < str.length; i++) {
    hashedStr += str.charCodeAt(i) + 333;
  }

  return hashedStr;
};

module.exports = hash;
