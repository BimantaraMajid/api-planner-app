const express = require('express');
const { query } = require('express-validator');
const validatePayload = require('../../middleware/express-validator');
const { getActivities } = require('../../controllers/activities');

const activitiesRouter = express.Router();

activitiesRouter.get(
  '/',
  [
    query('page')
      .default(1)
      .isNumeric()
      .toInt()
      .withMessage('Must be a number')
      .isInt({ min: 1 })
      .withMessage('Number min 1'),
    query('limit')
      .default(20)
      .isNumeric()
      .toInt()
      .withMessage('Must be a number')
      .isInt({ min: 1 })
      .withMessage('Number min 1'),
    query('q')
      .default('')
      .toLowerCase(),
  ],
  validatePayload,
  getActivities,
);

module.exports = activitiesRouter;
