const express = require('express');
const paginationPayload = require('../../middleware/express-validator/pagination-payload');
const validatePayload = require('../../middleware/express-validator');
const { getNotes } = require('../../controllers/notes');

const notesRouter = express.Router();

notesRouter.get(
  '/',
  paginationPayload,
  validatePayload,
  getNotes,
);

module.exports = notesRouter;
