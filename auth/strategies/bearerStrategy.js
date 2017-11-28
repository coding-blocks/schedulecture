const BearerStrategy = require('passport-http-bearer').Strategy;
const models = require('./../../db/models');


module.exports = new BearerStrategy(function (token, done) {

    if (token === null || token === undefined) {
        return done(null, false, {message: 'Could not authorize'});
    }

    models.AuthToken.findOne({
        where: {
            client_token: token
        },
        include: [models.User]
    }).then(function (authToken) {

        if (authToken && authToken.user) {
            return done(null, authToken.user);
        }

        else {
            return done(null, false);
        }
    }).catch(function (err) {
        console.log(err);
        return done(err, false);
    });

})
