/**
 * Created by tld3112 on 13-Sep-17.
 */

const models = require('../models')
const Raven = require('raven');

module.exports = {
  createNew: function (name, capacity, config, centreId, done) {
    models.Rooms.create({
      name: name,
      centreId: centreId,
      capacity: capacity,
      config: config
    }).then(function (data) {
      done(null, data)
    }).catch(function (err) {
        Raven.captureException(err);
      if (err) done(err);
    });
  },
  getAll: function (done) {
    models.Rooms.findAll({
      order: ['id']
    }).then(function (data) {
      done(null, data)
    }).catch(function (err) {
        Raven.captureException(err);
      if (err) done(err);
    });
  },
  search: function (id, done) {
    models.Rooms.findOne({
      where: {
        id: id
      }
    }).then(function (data) {
      done(null, data)
    }).catch(function (err) {
        Raven.captureException(err);
      if (err) done(err);
    });
  },
  edit: function (id, obj, done) {
    models.Rooms.findOne({
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
          Raven.captureException(err);
        if (err) done(err);
      })
    }).catch(function (err) {
        Raven.captureException(err);
      if (err) done(err);
    });
  },
  deleteRoom: function (id, done) {
    models.Rooms.destroy({
      where: {
        id: id
      }
    }).then(function (data) {
      done(null, data)
    }).catch(function (err) {
        Raven.captureException(err);
      if (err) done(err);
    });
  },
  getLectures: function (id, done) {
    models.Lectures.findAll({
      where: {
        roomId: id
      },
      order: ['id']
    }).then(function (data) {
      done(null, data)
    }).catch(function (err) {
        Raven.captureException(err);
      if (err) done(err);
    });
  }
}