const { httpNotFound } = require('../../Utils/http-response');
const db = require('../../models');

/** @type {import('express').Router} */
// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
  const { id } = req.params;
  const plan = await db.plans.findByPk(id);
  if (!plan?.id) return httpNotFound(res, { id }, 'plan not found');
  next();
};
