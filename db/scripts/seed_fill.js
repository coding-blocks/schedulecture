/**
 * Created by bhavyaagg on 30/12/17.
 */
const debug= require('debug')('schedulecture:db/scripts/seed_fill')
const models = require('./../models');
const seed = require('./../seed');

models.DATABASE.sync({
  force: true,
}).then(function () {
  debug("Database Configured");

  models.Teachers.bulkCreate(seed.teachers, {returning: true}).then(function (r) {
    debug(r.map(v => v.get()));
  }).catch(function (err) {
    debug(err);
  });

  models.Courses.bulkCreate(seed.courses, {returning: true}).then(function (r) {
    debug(r.map(v => v.get()));
  }).catch(function (err) {
    debug(err);
  });

  models.Centres.bulkCreate(seed.centres, {returning: true}).then(function (r) {
    debug(r.map(v => v.get()));
    models.Rooms.bulkCreate(seed.rooms, {returning: true}).then(function (r) {
      debug(r.map(v => v.get()));
    })
  }).catch(function (err) {
    debug(err);
  })

});
