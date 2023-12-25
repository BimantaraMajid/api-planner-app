const { query } = require('express-validator');

module.exports = [
  query('page')
    .default(1)
    .isNumeric()
    .toInt()
    .withMessage('Must be a number')
    .isInt({ min: 1 })
    .withMessage('Number min 1'),
  query('limit')
    .default(100)
    .isNumeric()
    .toInt()
    .withMessage('Must be a number')
    .isInt({ min: 1 })
    .withMessage('Number min 1'),
  query('q')
    .default('')
    .toLowerCase(),
];
