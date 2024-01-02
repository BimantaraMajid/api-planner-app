const express = require('express');
const { param, body } = require('express-validator');
const paginationPayload = require('../../middleware/express-validator/pagination-payload');
const validatePayload = require('../../middleware/express-validator');
const {
  getNotes, getNoteById, postNote, putNote, deleteNote,
} = require('../../controllers/notes');
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
      .notEmpty()
      .withMessage('Required id')
      .isNumeric()
      .withMessage('Must be a number')
      .toInt(),
  ],
  validatePayload,
  idValidate,
  getNoteById,
);

notesRouter.post(
  '/',
  [
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .isString()
      .withMessage('Must be a string'),
    body('content')
      .optional()
      .isString()
      .withMessage('Must be a string'),
  ],
  validatePayload,
  postNote,
);

notesRouter.put(
  '/:id',
  [
    param('id')
      .notEmpty()
      .withMessage('Id is required')
      .isNumeric()
      .withMessage('Must be a number')
      .toInt(),
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .isString()
      .withMessage('Must be a string'),
    body('content')
      .optional()
      .isString()
      .withMessage('Must be a string'),
  ],
  validatePayload,
  idValidate,
  putNote,
);

notesRouter.delete(
  '/:id',
  [
    param('id')
      .notEmpty()
      .withMessage('Id is required')
      .isNumeric()
      .withMessage('Must be a number')
      .toInt(),
  ],
  validatePayload,
  idValidate,
  deleteNote,
);

module.exports = notesRouter;
