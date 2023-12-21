/* eslint-disable camelcase */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class activities_tags extends Model {
    static associate() {
      // define association here
    }
  }
  activities_tags.init({
    tagId: DataTypes.INTEGER,
    activityId: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'activities_tags',
  });
  return activities_tags;
};
