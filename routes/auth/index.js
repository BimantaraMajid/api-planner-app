const express = require('express');
const { body } = require('express-validator');
const { postLogin, postRegister, postRefreshToken } = require('../../controllers/auth');
const validatePayload = require('../../middleware/express-validator');
const verifyRefreshToken = require('../../middleware/verify-refresh-token');

const authRouter = express.Router();

authRouter.post(
  '/login',
  [
    body('username')
      .notEmpty()
      .withMessage('Username is required')
      .isString()
      .withMessage('Username must be a string'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isString()
      .withMessage('Password must be a string'),
  ],
  validatePayload,
  postLogin,
);

authRouter.post(
  '/login/refresh',
  [
    body('refresh_token')
      .notEmpty()
      .withMessage('refresh_token is required')
      .isString()
      .withMessage('refresh_token must be a string')
      .isJWT()
      .withMessage('Invalid JWT format'),
  ],
  validatePayload,
  verifyRefreshToken,
  postRefreshToken,
);

authRouter.post(
  '/register',
  [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isString()
      .withMessage('Email must be a string')
      .isEmail()
      .withMessage('Invalid email format'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isString()
      .withMessage('Password must be a string'),
  ],
  validatePayload,
  postRegister,
);

module.exports = authRouter;
