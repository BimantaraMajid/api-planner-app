const express = require('express');
const { body } = require('express-validator');
const { postLogin, postRegister, postRefreshToken } = require('../../controllers/auth');
const validatePayload = require('../../middleware/express-validator');
const verifyRefreshToken = require('../../middleware/verify-refresh-token');

const authRouter = express.Router();

authRouter.post(
  '/login',
  [
    body('username').notEmpty().withMessage('required'),
    body('password').notEmpty().withMessage('required'),
  ],
  validatePayload,
  postLogin,
);

authRouter.post(
  '/login/refresh',
  [
    body('refresh_token').notEmpty().withMessage('required'),
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
    body('password').notEmpty().isString().withMessage('required'),
  ],
  validatePayload,
  postRegister,
);

module.exports = authRouter;
