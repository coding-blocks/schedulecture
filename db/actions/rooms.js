/**
 * Created by tld3112 on 13-Sep-17.
 */

const models = require('../models')

module.exports = {
    createNew: function (name, capacity, config, centreId, done) {
        models.rooms.create({
            name: name,
            centreId : centreId,
            capacity : capacity,
            config : config
        }).then(function (data) {
            done(null, data)
        }).catch(function (err) {
            if (err) done(err);
        });
    },
    getAll: function (done) {
        models.rooms.findAll({
        }).then(function (data) {
            done(null, data)
        }).catch(function (err) {
            if (err) done(err);
        });
    },
    search: function (id, done) {
        models.rooms.findOne({
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
        models.rooms.findOne({
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
    deleteRoom: function (id, done) {
        models.rooms.destroy({
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