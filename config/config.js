/** @type {import('sequelize').Options} */
module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: process.env.NODE_ENV !== 'production' ? console.info : false,
};
