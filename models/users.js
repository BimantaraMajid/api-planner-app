const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate() {
      // define association here
    }
  }
  users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isVerified: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
