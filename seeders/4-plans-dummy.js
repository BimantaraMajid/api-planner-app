// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');
const db = require('../models');
const planType = require('../constant/plan/type');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const bulk = [];
    const users = await db.users.findAll();
    const activities = await db.activities.findAll({ limit: 5 });
    // eslint-disable-next-line no-restricted-syntax
    for (const user of users) {
      // eslint-disable-next-line no-restricted-syntax
      for (const activity of activities) {
        bulk.push({
          createdAt: new Date(),
          updatedAt: new Date(),
          name: activity.name,
          startDate: faker.date.between({ from: '2023-12-01', to: '2023-12-31' }),
          endDate: faker.date.between({ from: '2024-01-01', to: '2024-12-31' }),
          userId: user.id,
          type: planType.ARRAY[faker.number.int({ min: 0, max: planType.ARRAY.length - 1 })],
          frequency: faker.number.int({ min: 1, max: 30 }),
          tag: [
            faker.word.words(1),
            faker.word.words(1),
            faker.word.words(1),
          ],
        });
      }
    }

    await queryInterface.bulkInsert('plans', bulk);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('plans', null, {});
  },
};
