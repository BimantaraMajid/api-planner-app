const jwt = require('jsonwebtoken');

const generateToken = (data = {}) => jwt.sign(data, process.env.JWT_KEY, {
  expiresIn: process.env.TOKEN_EXPIRED,
});
const generateRefreshToken = (data = {}) => jwt.sign(data, process.env.JWT_KEY, {
  expiresIn: process.env.REFRESH_TOKEN_EXPIRED,
});

module.exports = {
  generateToken,
  generateRefreshToken,
};
