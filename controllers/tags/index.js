const { httpSuccess, httpInternalServerError } = require('../../Utils/http-response');
const pagination = require('../../Utils/response-template/pagination');
const db = require('../../models');

/** @type {import('express').Router} */
const getTags = async (req, res) => {
  try {
    const { q, page, limit } = req.query;
    const activities = await db.tags.findAndCountAll({
      where: {
        name: {
          [db.Sequelize.Op.iLike]: `%${q}%`,
        },
      },
      offset: (page - 1) * limit,
      limit,
      order: [['name', 'asc']],
    });
    return httpSuccess(res, pagination({
      items: activities?.rows,
      limit,
      page,
      totalItems: activities.count,
    }));
  } catch (error) {
    console.error(error);
    return httpInternalServerError(res);
  }
};

module.exports = {
  getTags,
};
