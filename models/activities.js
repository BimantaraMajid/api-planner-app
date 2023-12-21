const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class activities extends Model {
    static associate(model) {
      // define association here
      activities.belongsToMany(model.tags, {
        through: model.activities_tags,
      });
    }
  }
  activities.init({
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    color: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'activities',
  });
  return activities;
};
