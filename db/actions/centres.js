/**
 * Created by abhishekyadav on 25/08/17.
 */
const models = require('../models')

module.exports = {
    createNew: function (name, done) {
        models.centres.create({
            name: name
        }).then(function (data) {
            done(null, data)
        }).catch(function (err) {
            if (err) done(err);
        });
    },
    getAll: function (done) {
        models.centres.findAll({}).then(function (data) {
            done(null, data)
        }).catch(function (err) {
            if (err) done(err);
        });
    },
    search: function (id, done) {
        models.centres.findOne({
            where: {
                id: id
            }
        }).then(function (data) {
            done(null, data)
        }).catch(function (err) {
            if (err) done(err);
        });
    },
    edit: function (id, obj, done) {
        models.centres.findOne({
            where: {
                id: id
            }
        }).then(function (data) {
            if (!data) {
                return done(null, null)
            }
            data.update(obj).then(function (resData) {
                done(null, resData);
            }).catch(function (err) {
                if (err) done(err);
            })
        }).catch(function (err) {
            if (err) done(err);
        });
    },
    deleteCentre: function (id, done) {
        models.centres.destroy({
            where: {
                id: id
            }
        }).then(function (data) {
            done(null, data)
        }).catch(function (err) {
            if (err) done(err);
        });
    }
}