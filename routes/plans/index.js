const express = require('express');
const { param } = require('express-validator');
const validatePayload = require('../../middleware/express-validator');
const paginationPayload = require('../../middleware/express-validator/pagination-payload');
const {
  getPlans,
  getPlansByDate,
  postPlan,
  getPlanTypes,
  getPlansById,
  putPlan,
} = require('../../controllers/plans');
const { isValidDate } = require('../../middleware/express-validator/custom-validate');
const postPlanValidate = require('./post-validate');
const idValidate = require('../../controllers/plans/id-validate');

const plansRouter = express.Router();

plansRouter.get(
  '/',
  paginationPayload,
  validatePayload,
  getPlans,
);

plansRouter.get('/types', getPlanTypes);

plansRouter.get(
  '/:id',
  [
    param('id')
      .isNumeric()
      .withMessage('Must be a number')
      .toInt(),
  ],
  validatePayload,
  getPlansById,
);

plansRouter.get(
  '/date/:date',
  [
    param('date')
      .matches(/^\d{4}\d{2}\d{2}$/)
      .withMessage('Input must be in the format YYYYMMDD.')
      .custom(isValidDate)
      .withMessage('Invalid date of date'),
  ],
  validatePayload,
  getPlansByDate,
);

plansRouter.post(
  '/',
  postPlanValidate,
  validatePayload,
  postPlan,
);

plansRouter.put(
  '/:id',
  param('id')
    .isNumeric()
    .withMessage('Must be a number')
    .toInt(),
  postPlanValidate,
  validatePayload,
  idValidate,
  putPlan,
);

module.exports = plansRouter;
