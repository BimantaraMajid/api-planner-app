const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    static associate() {
      // define association here
    }
  }
  tags.init({
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    color: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'tags',
  });
  return tags;
};
