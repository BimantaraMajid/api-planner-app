const jwt = require('jsonwebtoken');
const { httpUnauthorized } = require('../Utils/http-response');

/** @type {import('express').Router} */
// eslint-disable-next-line consistent-return
const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.body?.refresh_token;

  if (!refreshToken) {
    return httpUnauthorized(res, 'Unauthorized: Token is missing');
  }

  // eslint-disable-next-line consistent-return
  jwt.verify(refreshToken, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return httpUnauthorized(res, 'Unauthorized: Invalid refresh token');
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyRefreshToken;
