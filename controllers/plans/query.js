const moment = require('moment');
const db = require('../../models');
const { PLAN_TYPES } = require('../../constant/plan');
const { FORMAT_DATE } = require('../../constant/moment');

const { Op, literal } = db.Sequelize;

function getAllPlansWithCount({
  userId, page, limit, q,
}) {
  return db.plans.findAndCountAll({
    where: {
      userId: {
        [Op.eq]: userId,
      },
      name: {
        [Op.iLike]: `%${q}%`,
      },
    },
    offset: (page - 1) * limit,
    limit,
    order: [['startDate', 'asc']],
  });
}

async function getActivePlansByDate({
  date, userId,
}) {
  const dateSearch = moment(date);
  let plans = await db.plans.findAll({
    where: {
      [date]: {
        userId: {
          [Op.eq]: userId,
        },
        [Op.or]: [
          literal(`("endDate" is null and "startDate"::date <= '${dateSearch.format(FORMAT_DATE.DATE_ONLY)}')`),
          literal(`'${dateSearch.format(FORMAT_DATE.DATE_ONLY)}' between "startDate" and "endDate" `),
        ],
      },
    },
    order: [
      ['type', 'asc'],
      ['frequency', 'asc'],
    ],
  });
  plans = plans.filter((plan) => {
    const startDate = moment(plan.startDate);
    const dateDiff = dateSearch.diff(startDate, 'd');
    switch (plan.type) {
      case PLAN_TYPES.ONCE:
        return startDate.isSame(dateSearch);
      case PLAN_TYPES.DAILY:
        return !(dateDiff % plan.frequency);
      case PLAN_TYPES.WEEKLY:
        return plan.frequency === dateSearch.day();
      case PLAN_TYPES.MONTHLY:
        return plan.frequency === dateSearch.date();
      default:
        return false;
    }
  });
  return plans;
}

async function insertPlan({
  name, startDate, endDate, userId, type, frequency, tag,
}) {
  return db.plans.create({
    name,
    startDate,
    endDate,
    userId,
    type,
    frequency,
    tag,
  });
}

module.exports = {
  getAllPlansWithCount,
  getActivePlansByDate,
  insertPlan,
};
