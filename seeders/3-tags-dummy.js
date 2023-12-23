// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'tags',
      Array(100)
        .fill({})
        .map(() => ({
          createdAt: new Date(),
          updatedAt: new Date(),
          name: faker.word.words(1) + faker.word.words(1),
          icon: faker.internet.emoji(),
          color: faker.internet.color(),
          isActive: Boolean(faker.number.int({ min: 0, max: 1 })),
        })),
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tags', null, {});
  },
};
