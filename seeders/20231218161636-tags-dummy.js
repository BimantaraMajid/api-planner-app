/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('tags', [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Meeting with Team',
        icon: 'icon-meeting',
        color: '#3498db',
        isActive: true,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Work on Project A',
        icon: 'icon-project',
        color: '#2ecc71',
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
        name: 'Call Mom',
        icon: 'icon-phone',
        color: '#e67e22',
        isActive: true,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Plan Weekend Getaway',
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
    await queryInterface.bulkDelete('tags', null, {});
  },
};
