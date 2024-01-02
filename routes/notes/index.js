const express = require('express');
const { param } = require('express-validator');
const paginationPayload = require('../../middleware/express-validator/pagination-payload');
const validatePayload = require('../../middleware/express-validator');
const { getNotes, getNoteById } = require('../../controllers/notes');
const idValidate = require('../../controllers/notes/id-validate');

const notesRouter = express.Router();

notesRouter.get(
  '/',
  paginationPayload,
  validatePayload,
  getNotes,
);

notesRouter.get(
  '/:id',
  [
    param('id')
      .isNumeric()
      .withMessage('Must be a number')
      .toInt(),
  ],
  validatePayload,
  idValidate,
  getNoteById,
);

module.exports = notesRouter;
