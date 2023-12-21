const express = require('express');
const { query, param } = require('express-validator');
const validatePayload = require('../../middleware/express-validator');
const { getActivities, getActivitiesByID, getActivitiesTags } = require('../../controllers/activities');

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

activitiesRouter.get(
  '/:id',
  [
    param('id')
      .isNumeric()
      .withMessage('Must be a number')
      .toInt(),
  ],
  validatePayload,
  getActivitiesByID,
);

activitiesRouter.get(
  '/:id/tags',
  [
    param('id')
      .isNumeric()
      .withMessage('Must be a number')
      .toInt(),
  ],
  validatePayload,
  getActivitiesTags,
);

module.exports = activitiesRouter;
