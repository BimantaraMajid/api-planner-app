const db = require('../../models');

const { Op } = db.Sequelize;

function getAllNotesWithCount({
  q, page, limit, userId,
}) {
  return db.notes.findAndCountAll({
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
    order: [['createdAt', 'desc']],
  });
}

function getNoteByPk({
  id,
}) {
  return db.notes.findByPk(id);
}

async function insertNote({
  userId, name,
}) {
  const note = await db.notes.create({
    userId,
    name,
  });

  return getNoteByPk({ id: note.id });
}

async function updateNote({
  id, name,
}) {
  const note = await db.notes.update({
    name,
  }, {
    where: {
      id,
    },
  });

  return getNoteByPk({ id: note.id });
}

module.exports = {
  getAllNotesWithCount,
  getNoteByPk,
  insertNote,
  updateNote,
};
