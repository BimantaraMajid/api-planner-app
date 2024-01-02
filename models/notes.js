const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class notes extends Model {
    static associate() {
    }
  }
  notes.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'notes',
  });
  return notes;
};
