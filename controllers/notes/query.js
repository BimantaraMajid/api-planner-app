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
      title: {
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
  userId, title, content,
}) {
  const note = await db.notes.create({
    userId, title, content,
  });

  return getNoteByPk({ id: note.id });
}

async function updateNote({
  id, title, content,
}) {
  await db.notes.update({
    title, content,
  }, {
    where: {
      id,
    },
  });

  return getNoteByPk({ id });
}

async function removeNoteById({ id }) {
  return db.notes.destroy({ where: { id } });
}

module.exports = {
  getAllNotesWithCount,
  getNoteByPk,
  insertNote,
  updateNote,
  removeNoteById,
};
