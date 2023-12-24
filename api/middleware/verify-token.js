const jwt = require('jsonwebtoken');
const { httpUnauthorized } = require('../Utils/http-response');

/** @type {import('express').Router} */
// eslint-disable-next-line consistent-return
const verifyToken = (req, res, next) => {
  const [typeAuth, token] = req.headers.authorization?.split(' ') ?? [];

  if (!token) return httpUnauthorized(res, 'Unauthorized: Token is missing');
  if (typeAuth !== 'Bearer') return httpUnauthorized(res, 'Invalid authentication type');

  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return httpUnauthorized(res, 'Unauthorized: Invalid token');
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
