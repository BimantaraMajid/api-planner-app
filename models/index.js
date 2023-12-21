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

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
