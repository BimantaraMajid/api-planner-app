/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activities_tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tags',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      activityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'activities',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint('activities_tags', {
      type: 'unique',
      fields: ['tag_id', 'activity_id'],
      name: 'unique_tag_activity_constraint',
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('activities_tags');
  },
};
