const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  tasks.init({
    name: DataTypes.STRING,
    planId: DataTypes.INTEGER,
    time: DataTypes.TIME,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tasks',
  });
  return tasks;
};
