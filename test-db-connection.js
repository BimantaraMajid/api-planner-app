const { Sequelize } = require('sequelize');
const config = require('./config/config');

const seq = new Sequelize(config.database, config.username, config.password, config);

(async () => {
  try {
    await seq.authenticate();
    console.info('authenticated successfully');
  } catch (error) {
    console.error(error);
    console.info('error authenticating :', error?.message);
  }
})();
