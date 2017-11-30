const passport = require('passport');
const oneauthStrategy = require('passport-oneauth');
const models = require('../db/models');
const secrets = require('../secrets.json');
const randtoken = require('rand-token')
const bearerStrategy = require('./strategies/bearerStrategy');


passport.use('oneauth', new oneauthStrategy({
    authorizationURL: 'https://account.codingblocks.com/oauth/authorize',
    tokenURL: 'https://account.codingblocks.com/oauth/token',
    include: ['lms'],
    clientID: secrets.clientID,
    clientSecret: secrets.clientSecret,
    callbackURL: 'http://localhost:4000/users/login/cb/callback'
  },
  function (accessToken, refreshToken, profile, done) {
    if (profile.role === 'admin' || profile.role === 'employee' || profile.role === 'intern') {
      models.AuthToken.findOrCreate(
        {
          where: {
            accesstoken: accessToken
          },
          defaults: {
            accesstoken: accessToken,
            clientoken: randtoken.generate(16),
            user: {
              name: profile.name,
              email: profile.email,
            }
          },
          include: [models.Users]
        }
      ).then(function (authtokenObject) {
        return done(null, authtokenObject[0].get())
      }).catch(function (err) {
        console.log(err);
      })
    }
    else {
      return done(null, false, {message: 'Not an admin'});
    }
  }
));

passport.serializeUser(function (authtokenObject, done) {
  return done(null, {
    id: authtokenObject.userId
  })

});

passport.deserializeUser(function (user, done) {

  models.Users.findOne({
    where: {
      id: user.id
    }
  }).then((user) => {
    return done(null, user);
  });

});
passport.use('bearer', bearerStrategy);

module.exports = passport;