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
    console.error(error);
    return httpInternalServerError(res);
  }
};

/** @type {import('express').Router} */
const getActivitiesByID = async (req, res) => {
  try {
    const activity = await db.activities.findByPk(req.params?.id);
    if (!activity) return httpNotFound(res, { id: req.params.id }, 'Activity not found');

    return httpSuccess(res, activity);
  } catch (error) {
    console.error(error);
    return httpInternalServerError(res);
  }
};

/** @type {import('express').Router} */
const getActivitiesTags = async (req, res) => {
  try {
    const activity = await db.activities.findByPk(req.params.id, {
      include: [
        {
          model: db.tags,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          through: {
            attributes: [],
            where: {
              isActive: true,
            },
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    if (!activity) return httpNotFound(res, { id: req.params.id }, 'Activity not found');

    return httpSuccess(res, activity?.tags ?? []);
  } catch (error) {
    console.error(error);
    return httpInternalServerError(res);
  }
};

module.exports = {
  getActivities,
  getActivitiesByID,
  getActivitiesTags,
};
