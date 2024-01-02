const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class notes extends Model {
    static associate() {
    }
  }
  notes.init({
    title: DataTypes.STRING,
    content: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'notes',
  });
  return notes;
};
