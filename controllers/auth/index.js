const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {
  httpSuccess,
  httpUnauthorized,
  httpInternalServerError,
  httpCreated,
  httpConflict,
  httpNotFound,
} = require('../../Utils/http-response');
const { generateToken, generateRefreshToken } = require('./token');
const { findUserByUsernameOrEmail } = require('../../Utils/users');
const db = require('../../models');

/** @type {import('express').Router} */
const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    /** @type {import('sequelize').Model} */
    const user = await findUserByUsernameOrEmail(username);
    if (!user?.id || !bcrypt.compareSync(password + user.salt, user.password)) {
      return httpUnauthorized(res, 'Invalid username or password');
    }

    const token = generateToken(user.dataValues);
    const refreshToken = generateRefreshToken(user.dataValues);

    return httpSuccess(res, {
      id: user.id,
      username: user.username,
      email: user.email,
      token,
      refresh_token: refreshToken,
    });
  } catch (error) {
    return httpInternalServerError(res);
  }
};

/** @type {import('express').Router} */
const postRefreshToken = async (req, res) => {
  try {
    /** @type {import('sequelize').Model} */
    const user = await findUserByUsernameOrEmail('');
    if (!user?.id) return httpNotFound(res, {}, 'User not found or user has been deleted');

    const token = generateToken(user.dataValues);
    const refreshToken = generateRefreshToken(user.dataValues);

    return httpSuccess(res, {
      id: user.id,
      username: user.username,
      email: user.email,
      token,
      refresh_token: refreshToken,
    });
  } catch (error) {
    return httpInternalServerError(res);
  }
};

/** @type {import('express').Router} */
const postRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByUsernameOrEmail(email);
    if (user?.id) {
      return httpConflict(res, { email }, 'Email already registered');
    }

    const saltPassword = crypto.randomBytes(16).toString('base64');
    await db.users.create({
      username: email,
      email,
      password: bcrypt.hashSync(password + saltPassword, 10),
      salt: saltPassword,
    });

    return httpCreated(res, {}, 'Successfully registered');
  } catch (error) {
    return httpInternalServerError(res);
  }
};

module.exports = {
  postLogin,
  postRegister,
  postRefreshToken,
};
