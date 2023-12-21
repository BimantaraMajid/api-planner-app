const { httpInternalServerError, httpSuccess, httpNotFound } = require('../../Utils/http-response');
const pagination = require('../../Utils/response-template/pagination');
const db = require('../../models');

/** @type {import('express').Router} */
const getActivities = async (req, res) => {
  try {
    const { q, page, limit } = req.query;
    const activities = await db.activities.findAndCountAll({
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
    return httpInternalServerError(res);
  }
};

/** @type {import('sequelize').Router} */
const getActivitiesByID = async (req, res) => {
  try {
    const activity = await db.activities.findByPk(req.params?.id);
    if (!activity) return httpNotFound(res, { id: req.params.id }, 'Item not found');

    return httpSuccess(res, activity);
  } catch (error) {
    return httpInternalServerError(res);
  }
};

const getActivitiesTags = async (req, res) => {
  try {
    const tags = await db.activities.findAll({
      include: [
        {
          model: db.tags,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          through: {
            attributes: [],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: {
        id: {
          [db.Sequelize.Op.eq]: req.params.id,
        },
      },
    });

    return httpSuccess(res, tags);
  } catch (error) {
    return httpInternalServerError(res);
  }
};

module.exports = {
  getActivities,
  getActivitiesByID,
  getActivitiesTags,
};
