const express = require('express');
const router = express.Router();
const passport = require('../auth/passport');


router.get('/login/cb',passport.authenticate('oneauth'));


router.get('/login/cb/callback',
    passport.authenticate('oneauth', {failureRedirect: '/'}),function (req, res) {
        res.redirect('/admin')
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
