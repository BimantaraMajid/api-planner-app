const express = require('express');
const { param } = require('express-validator');
const validatePayload = require('../../middleware/express-validator');
const { getActivities, getActivitiesByID, getActivitiesTags } = require('../../controllers/activities');
const paginationPayload = require('../../middleware/express-validator/pagination-payload');

const activitiesRouter = express.Router();

activitiesRouter.get(
  '/',
  paginationPayload,
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
