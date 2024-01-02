const { httpNotFound, httpUnauthorized, httpInternalServerError } = require('../../Utils/http-response');
const db = require('../../models');

/** @type {import('express').Router} */
// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const note = await db.notes.findByPk(id);

    if (!note?.id) return httpNotFound(res, { id }, 'note not found');
    if (note.userId !== userId) return httpUnauthorized(res, {}, 'You are not authorized to access this note');

    next();
  } catch (error) {
    return httpInternalServerError(res);
  }
};
