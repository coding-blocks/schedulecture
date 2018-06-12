const parseDbUrl = require('parse-database-url')
let clientId, clientSecret, callBackURL;

config = {
  clientId,
  clientSecret,
  callBackURL,
};
config.DEPLOY_CONFIG = process.env.SCHEDULECTURE_ENV || 'production'

switch (config.DEPLOY_CONFIG) {
  case 'production':
    config.secrets = require('./secrets')
    config.db = config.secrets.DATABASE
    config.clientId = config.secrets.ONEAUTH.CLIENT_ID;
    config.clientSecret = config.secrets.ONEAUTH.CLIENT_SECRET;
    config.hostName = 'https://timetable.codingblocks.com'
    break;

  case 'localhost':
    config.secrets = require('./secrets')
    config.db = config.secrets.DATABASE
    config.clientId = config.secrets.ONEAUTH.CLIENT_ID;
    config.clientSecret = config.secrets.ONEAUTH.CLIENT_SECRET;
    config.hostName = 'http://localhost:4000'
    break;

  case 'heroku':
    let dbConf = parseDbUrl(process.env.DATABASE_URL)
    config.db = {
      "DB": dbConf.database,
      "USER": dbConf.user,
      "PASSWORD": dbConf.password,
      "DIALECT": dbConf.driver,
      "HOST": dbConf.host,
      "PORT": dbConf.port
    }
    config.clientId = process.env.ONEAUTH_CLIENT_ID || "305318444";
    config.clientSecret = process.env.ONEAUTH_CLIENT_SECRET || "0LH6aQvR6avoCOkJtUFOIMxQqbN3LJP2FyLenoQqp5VpV2MuFZ7t6NFK55tFbUQC";
    config.hostName = 'http://schedulecture.herokuapp.com'
    break;
}
config.callBackURL = `${config.hostName}/users/login/cb/callback`;
config.SENTRY_DSN = process.env.SENTRY_DSN || config.secrets.SENTRY_DSN
config.NEW_RELIC_LICENSE_KEY = process.env.NEW_RELIC_LICENSE_KEY || config.secrets.NEW_RELIC_LICENSE_KEY


exports = module.exports = config
