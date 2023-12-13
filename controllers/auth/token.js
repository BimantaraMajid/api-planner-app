const jwt = require('jsonwebtoken');

const generateToken = (data = {}) => jwt.sign(data, process.env.JWT_KEY, { expiresIn: '1h' });
const generateRefreshToken = (data = {}) => jwt.sign(data, process.env.JWT_KEY, { expiresIn: '7d' });

module.exports = {
  generateToken,
  generateRefreshToken,
};
