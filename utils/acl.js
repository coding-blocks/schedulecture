function ensureadmin() {
    return function (req, res, next) {
        if (req.user) {
            //TODO: Check that the user is actually admin (onauth provides this info)
            return next();
        }

        res.status(401).send({success: false, error: {message: 'You are not an admin'}});
    }

}

module.exports = {
    ensureadmin
}
