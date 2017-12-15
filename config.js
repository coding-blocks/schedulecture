const parseDbUrl = require('parse-database-url')
let clientId, clientSecret, callBackURL;

config = {
  clientId,
  clientSecret,
  callBackURL,
  server: {

  }
};
const DEPLOY_CONFIG = process.env.SCHEDULECTURE_ENV || 'production'

switch (DEPLOY_CONFIG) {
  case 'production':
    config.db = require('./secrets').DATABASE
    config.clientId = require('./secrets').ONEAUTH.CLIENT_ID;
    config.clientSecret = require('./secrets').ONEAUTH.CLIENT_SECRET;
    config.callBackURL = 'http://localhost:4000/users/login/cb/callback';
    break;

  case 'localhost':
    config.db = require('./secrets-sample').DATABASE
    config.clientId = require('./secrets-sample').ONEAUTH.CLIENT_ID;
    config.clientSecret = require('./secrets-sample').ONEAUTH.CLIENT_SECRET;
    config.callBackURL = 'http://localhost:4000/users/login/cb/callback';
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
    config.callBackURL = "http://schedulecture.herokuapp.com/users/login/cb/callback";
    break;
}


exports = module.exports = config