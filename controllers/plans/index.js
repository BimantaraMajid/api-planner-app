const { httpInternalServerError, httpSuccess, httpCreated } = require('../../Utils/http-response');
const pagination = require('../../Utils/response-template/pagination');
const { PLAN_TYPES } = require('../../constant/plan');
const { getAllPlansWithCount, getActivePlansByDate, insertPlan } = require('./query');

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

/** @type {import('express').Router} */
const getPlanTypes = async (req, res) => httpSuccess(res, PLAN_TYPES);

module.exports = {
  getPlans,
  getPlansByDate,
  postPlan,
  getPlanTypes,
};