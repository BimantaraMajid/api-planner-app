const express = require('express');
const validatePayload = require('../../middleware/express-validator');
const { getTags } = require('../../controllers/tags');
const paginationPayload = require('../../middleware/express-validator/pagination-payload');

const tagsRouter = express.Router();

tagsRouter.get(
  '/',
  paginationPayload,
  validatePayload,
  getTags,
);

module.exports = tagsRouter;
