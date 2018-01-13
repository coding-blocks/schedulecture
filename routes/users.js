const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');
const models = require('./../db/models');


router.get('/login/cb', passport.authenticate('oneauth'));

router.get('/login/cb/callback', passport.authenticate('oneauth', {failureRedirect: '/'}), function (req, res) {

  return res.redirect('/?clienttoken=' + req.user.clientoken + '&name=' + req.user.user.dataValues.name);

});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
