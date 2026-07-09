// const jwt = require('jsonwebtoken');

// /**
//  * Generates a JWT token for a given user ID.
//  * @param {string} id - User ID to encode in the token.
//  * @returns {string} - Signed JWT token.
//  */
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE || '7d', // Default to 7 days if not set in .env
//   });
// };

// module.exports = generateToken;



// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = generateToken;
