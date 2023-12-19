/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('activities', [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Cleaning Room',
        icon: 'icon-clean',
        color: '#000000',
        isActive: true,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Meeting',
        icon: 'icon-meeting',
        color: '#3498db',
        isActive: true,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Gym Workout',
        icon: 'icon-fitness',
        color: '#e74c3c',
        isActive: true,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Read Book',
        icon: 'icon-book',
        color: '#9b59b6',
        isActive: true,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Grocery Shopping',
        icon: 'icon-shopping',
        color: '#f39c12',
        isActive: true,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Weekend',
        icon: 'icon-travel',
        color: '#1abc9c',
        isActive: true,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Learn Coding',
        icon: 'icon-code',
        color: '#34495e',
        isActive: true,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Meditation',
        icon: 'icon-peace',
        color: '#27ae60',
        isActive: true,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Financial Review',
        icon: 'icon-wallet',
        color: '#2980b9',
        isActive: true,
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('activities', null, {});
  },
};
