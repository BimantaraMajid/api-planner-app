const { Sequelize } = require('sequelize');
const config = require('./config/config');

const seq = new Sequelize(config.database, config.username, config.password, config);

(async () => {
  try {
    await seq.authenticate();
    // eslint-disable-next-line no-console
    console.log('authenticated successfully');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error authenticating :', error?.message);
  }
})();
