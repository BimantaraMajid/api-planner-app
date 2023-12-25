const db = require('../../models');

async function findUserByUsernameOrEmail(searchString = '') {
  return db.users.findOne({
    where: {
      [db.Sequelize.Op.or]: {
        username: {
          [db.Sequelize.Op.eq]: searchString,
        },
        email: {
          [db.Sequelize.Op.eq]: searchString,
        },
      },
    },
  });
}

module.exports = {
  findUserByUsernameOrEmail,
};
