const { validationResult } = require('express-validator');
const { httpBadRequest } = require('../Utils/http-response');

// eslint-disable-next-line consistent-return
const validatePayload = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return httpBadRequest(res, errors?.array()[0], errors.array()[0]?.msg);
  }
  next();
};

module.exports = validatePayload;
