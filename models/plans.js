const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class plans extends Model {
    static associate(models) {
      plans.hasMany(models.tasks, {
        foreignKey: 'planId',
      });
    }
  }
  plans.init({
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    frequency: DataTypes.INTEGER,
    tag: DataTypes.ARRAY(DataTypes.STRING),
  }, {
    sequelize,
    modelName: 'plans',
  });
  return plans;
};
