const db = require('../../models');

function getAllNotesWithCount({
  q, page, limit, userId,
}) {
  return db.notes.findAndCountAll({
    where: {
      userId: {
        [db.Sequelize.Op.eq]: userId,
      },
      name: {
        [db.Sequelize.Op.iLike]: `%${q}%`,
      },
    },
    offset: (page - 1) * limit,
    limit,
    order: [['createdAt', 'desc']],
  });
}

module.exports = {
  getAllNotesWithCount,
};
