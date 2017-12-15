/**
 * Created by tech4GT on 8/25/17.
 */
const nr = require('newrelic')
const express = require('express');

const app = express();
const bp = require('body-parser')
const passport = require('passport')
const config = require('./config')

const Raven = require('raven');
Raven.config(config.SENTRY_DSN).install();


app.use(bp.json())
app.use(bp.urlencoded({extended: true}));
const api_v1 = require('./routes/api_v1');
const users = require('./routes/users');
app.use(passport.initialize());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//app.use(passport.session());

app.use('/', express.static(__dirname + "/public_html"));

/*app.get('/checkAdmin', (req, res, next) => {

  passport.authenticate('bearer', (err, user, info) => {

    if (err) { return res.status(500).json({success: false}) }

    if (!user) { return res.status(401).json({success: false})  }

    req.logIn(user, function(err) {

      if (err) { res.status(500).json({success: false}) }

      return res.status(200).json({success: true});
    });
  })(req, res, next)
});*/

app.get('/checkAdmin', passport.authenticate('bearer', {failWithError: true}),
  function (req, res, next) {
    // Handle success
    if (req.user)
      return res.status(200).json({success: true});

  },
  function (err, req, res, next) {
    // Handle error
    return res.status(401).json({success: false});
  }
);


app.use('/admin/centres/:id/rooms', express.static(__dirname + "/public_html/admin/centres/rooms"));
app.use('/admin/batches/:id/lectures', express.static(__dirname + "/public_html/admin/batches/lectures"));


app.use('/docs', express.static(__dirname + "/docs"));

app.use('/api/v1', api_v1)
app.use('/users', users)
// app.use('/bower_components', express.static(__dirname + "/bower_components"));
app.listen(process.env.PORT || 4000, function () {

  console.log(`Server listening at ` + (process.env.PORT || 4000));
});
