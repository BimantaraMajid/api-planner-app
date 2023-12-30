const { httpSuccess, httpInternalServerError } = require('../../Utils/http-response');
const pagination = require('../../Utils/response-template/pagination');
const { getAllNotesWithCount } = require('./query');

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

module.exports = {
  getNotes,
};
