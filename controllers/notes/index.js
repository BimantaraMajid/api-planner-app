const { httpSuccess, httpInternalServerError, httpCreated } = require('../../Utils/http-response');
const pagination = require('../../Utils/response-template/pagination');
const {
  getAllNotesWithCount,
  getNoteByPk,
  insertNote,
  updateNote,
  removeNoteById,
} = require('./query');

/** @type {import('express').Router} */
const getNotes = async (req, res) => {
  const { limit, page, q } = req.query;
  try {
    const notes = await getAllNotesWithCount({
      q, page, limit, userId: req.user.id,
    });

    return httpSuccess(res, pagination({
      items: notes?.rows,
      limit,
      page,
      totalItems: notes?.count,
    }));
  } catch (error) {
    return httpInternalServerError(res);
  }
};

/** @type {import('express').Router} */
const getNoteById = async (req, res) => {
  try {
    const note = await getNoteByPk({
      id: req.params.id,
      userId: req.user.id,
    });

    return httpSuccess(res, note);
  } catch (error) {
    console.error(error);
    return httpInternalServerError(res);
  }
};

/** @type {import('express').Router} */
const postNote = async (req, res) => {
  try {
    const note = await insertNote({
      userId: req.user.id,
      ...req.body,
    });

    return httpCreated(res, note, 'Note created successfully');
  } catch (error) {
    console.error(error);
    return httpInternalServerError(res);
  }
};

/** @type {import('express').Router} */
const putNote = async (req, res) => {
  try {
    const note = await updateNote({
      id: req.params.id,
      ...req.body,
    });

    return httpSuccess(res, note, 'Note updated successfully');
  } catch (error) {
    console.error(error);
    return httpInternalServerError(res);
  }
};

const deleteNote = async (req, res) => {
  try {
    await removeNoteById(req.params);

    return httpSuccess(res, {}, 'Note successfully deleted');
  } catch (error) {
    console.error(error);
    return httpInternalServerError(res);
  }
};

module.exports = {
  getNotes,
  getNoteById,
  postNote,
  putNote,
  deleteNote,
};
