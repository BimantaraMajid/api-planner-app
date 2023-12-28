const { body } = require('express-validator');
const { isValidDate } = require('../../middleware/express-validator/custom-validate');
const { PLAN_TYPES } = require('../../constant/plan');

module.exports = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),
  body('startDate')
    .optional()
    .notEmpty()
    .withMessage('StartDate is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Format should be like this "YYYY-MM-DD"')
    .custom(isValidDate)
    .withMessage('Invalid date of startDate'),
  body('endDate')
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('format should be like this "YYYY-MM-DD"')
    .custom(isValidDate)
    .withMessage('Invalid date of endDate'),
  body('type')
    .optional()
    .notEmpty()
    .withMessage('Type is required')
    .isIn(PLAN_TYPES.ARRAY)
    .withMessage(`Allowed values are (${PLAN_TYPES.ARRAY.join(' | ')})`)
    .custom((val, { req }) => {
      switch (req.body.type) {
        case PLAN_TYPES.ONCE:
          req.body.endDate = req.body.startDate;
          req.body.frequency = 1;
          break;
        case PLAN_TYPES.MONTHLY:
          req.body.frequency = req.body.startDate?.split('-')[2];
          break;
        default:
          break;
      }
      return true;
    }),
  body('frequency')
    .optional()
    .notEmpty()
    .withMessage('Frequency is required')
    .isNumeric()
    .withMessage('Frequency must be a number')
    .toInt()
    .isInt({ min: 0 })
    .withMessage('Value must be a greater than 0')
    .custom((val, { req }) => {
      switch (req.body.type) {
        case PLAN_TYPES.DAILY:
          if (val < 1) throw new Error('Value minimum for daily frequency is 1');
          return true;
        case PLAN_TYPES.WEEKLY:
          if (val > 6) throw new Error('Value maximum for weekly frequency is 6');
          return true;
        case PLAN_TYPES.MONTHLY:
          if (val < 1) throw new Error('Value minimum for monthly frequency is 1');
          return true;
        default:
          return true;
      }
    }),
  body('tag')
    .optional()
    .isArray()
    .withMessage('Tags must be an array[string]'),
  body('tag.*')
    .isString()
    .withMessage('Some value at tag is not string'),
  body('tasks')
    .optional()
    .isArray()
    .withMessage('Tags must be an array[object]'),
  body('tasks.*')
    .isObject()
    .withMessage('Tags must be an object {name}'),
  body('tasks.*.name')
    .isString()
    .withMessage('Some value at tag is not string'),
];
