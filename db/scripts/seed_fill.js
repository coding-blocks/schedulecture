/**
 * Created by bhavyaagg on 30/12/17.
 */

const models = require('./../models');
const seed = require('./../seed');
const debug = require('debug')('schedulecture:db:scripts:seed_fill')

models.DATABASE.sync({
  force: true,
}).then(function () {
  debug("Database Configured");

  models.Teachers.bulkCreate(seed.teachers, {returning: true}).then(function (r) {
    debug(r.map(v => v.get()));
  }).catch(function (err) {
    Raven.captureException(err)
    debug(err);
  });

  models.Courses.bulkCreate(seed.courses, {returning: true}).then(function (r) {
    debug(r.map(v => v.get()));
  }).catch(function (err) {
    Raven.captureException(err)
    debug(err);
  });

  models.Centres.bulkCreate(seed.centres, {returning: true}).then(function (r) {
    debug(r.map(v => v.get()));
    models.Rooms.bulkCreate(seed.rooms, {returning: true}).then(function (r) {
      debug(r.map(v => v.get()));
    })
  }).catch(function (err) {
    Raven.captureException(err)
    debug(err);
  })

});
