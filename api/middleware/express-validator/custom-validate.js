const moment = require('moment');

const isValidDate = (value) => {
  if (!moment(value).isValid()) {
    return false;
  }
  return true;
};

module.exports = {
  isValidDate,
};
