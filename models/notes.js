const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
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
