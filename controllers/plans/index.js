const {
  httpInternalServerError,
  httpSuccess,
  httpCreated,
  httpUpdated,
} = require('../../Utils/http-response');
const pagination = require('../../Utils/response-template/pagination');
const { PLAN_TYPES } = require('../../constant/plan');
const {
  getAllPlansWithCount,
  getActivePlansByDate,
  insertPlan,
  getPlansByPk,
  updatePlan,
} = require('./query');

/** @type {import('express').Router} */
const getPlans = async (req, res) => {
  try {
    const { q, page, limit } = req.query;
    const plans = await getAllPlansWithCount({
      q, page, limit, userId: req.user.id,
    });
    return httpSuccess(res, pagination({
      items: plans?.rows,
      limit,
      page,
      totalItems: plans?.count,
    }));
  } catch (error) {
    console.error(error);
    return httpInternalServerError(res);
  }
};

const getPlansById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await getPlansByPk({ id });

    return httpSuccess(res, plan);
  } catch (error) {
    console.error(error);
    return httpInternalServerError(res);
  }
};

/** @type {import('express').Router} */
const getPlansByDate = async (req, res) => {
  try {
    const plans = await getActivePlansByDate({
      date: req.params.date,
      userId: req.user.id,
    });

    return httpSuccess(res, plans);
  } catch (error) {
    console.error(error);
    console.error(error);
    return httpInternalServerError(res);
  }
};

/** @type {import('express').Router} */
const postPlan = async (req, res) => {
  try {
    const insert = await insertPlan({ ...req.body, userId: req.user.id });

    return httpCreated(res, insert, 'Plan successfully created');
  } catch (error) {
    console.error(error);
    return httpInternalServerError(res);
  }
};

const putPlan = async (req, res) => {
  try {
    const update = await updatePlan({
      ...req.body,
      userId: req.user.id,
      id: req.params.id,
    });

    return httpUpdated(res, update, 'Plan successfully updated');
  } catch (error) {
    console.error(error);
    return httpInternalServerError(res);
  }
};

/** @type {import('express').Router} */
const getPlanTypes = async (req, res) => httpSuccess(res, PLAN_TYPES);

module.exports = {
  getPlans,
  getPlanTypes,
  getPlansById,
  getPlansByDate,
  postPlan,
  putPlan,
};
