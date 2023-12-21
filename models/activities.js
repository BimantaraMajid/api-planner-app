const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
