/**
 * Created by bhavyaagg on 30/12/17.
 */

const models = require('./../models');
const seed = require('./../seed');

models.DATABASE.sync({
  force: true,
}).then(function () {
  console.log("Database Configured");

  models.Teachers.bulkCreate(seed.teachers, {returning: true}).then(function (r) {
    console.log(r.map(v => v.get()));
  }).catch(function (err) {
    console.log(err);
  });

});


