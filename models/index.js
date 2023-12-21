/* eslint-disable import/newline-after-import */
// const fs = require('fs');
// const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
db.users = require('./users')(sequelize, Sequelize.DataTypes);
db.activities = require('./activities')(sequelize, Sequelize.DataTypes);
db.activities_tags = require('./activities_tags')(sequelize, Sequelize.DataTypes);
db.tags = require('./tags')(sequelize, Sequelize.DataTypes);

// const basename = path.basename(__filename);
// fs
//   .readdirSync(__dirname)
//   .filter((file) => (
//     file.indexOf('.') !== 0
//       && file !== basename
//       && file.slice(-3) === '.js'
//       && file.indexOf('.test.js') === -1
//   ))
//   .forEach((file) => {
//     // eslint-disable-next-line import/no-dynamic-require, global-require
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
