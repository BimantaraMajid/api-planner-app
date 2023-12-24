const planTypes = {
  ONCE: 'once',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
};

module.exports = {
  ...planTypes,
  ARRAY: Object.values(planTypes),
};
