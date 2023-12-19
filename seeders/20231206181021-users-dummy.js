/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      createdAt: new Date(),
      updatedAt: new Date(),
      username: 'majid',
      email: 'majid@gmail.com',
      password: '$2b$10$TSJUT3CHZJXyLtHMvBPc6.hoHH/Sjh/Y9cs.nnV3pI1ETFycYWvyy',
      salt: 'w2xWWbq6vCog3aTjJgX0jQ==',
      isActive: true,
      isVerified: false,
    }], {});
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
