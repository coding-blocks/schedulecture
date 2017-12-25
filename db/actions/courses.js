/**
 * Created by tech4GT on 8/25/17.
 */

const models = require('../models')

module.exports = {
  createNew: function (name, desc, lect, hours, done) {
    models.Courses.create({
      name: name,
      desc: desc,
      lect: lect,
      hours: hours
    }).then(function (data) {
      done(null, data)
    }).catch(function (err) {
      if (err) done(err);
    });
  },
  getAll: function (done) {
    models.Courses.findAll({order: ['id']}).then(function (data) {
      done(null, data)
    }).catch(function (err) {
      if (err) done(err);
    });
  },
  search: function (id, done) {
    models.Courses.findOne({
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
    models.Courses.findOne({
      where: {
        id: id
      }
    }).then(function (data) {
      if (!data) {
        return done(null, null);
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
  deleteCourse: function (id, done) {
    models.Courses.destroy({
      where: {
        id: id
      }
    }).then(function (data) {
      done(null, data)
    }).catch(function (err) {
      if (err) throw err;
    });
  },
  getlectures: function (id, done) {
    models.Courses.findOne({
      where: {
        id: id
      },
      include: [{
        model: models.batches,
        include: [{
          model: models.lectures
        }]
      }]
    }).then(function (data) {
      var arr = [];
      var batches = data.dataValues.batches;
      for (var i in batches) {
        var lectures = batches[i].lectures;
        for (var j in lectures) {
          arr.push(lectures[j].dataValues);
        }
      }
      done(arr);
    }).catch(function (err) {
      if (err) done(err);
    });
  },
  getBatches: function (id, done) {
    models.batches.findAll({
      where: {
        courseId: id
      },
      order: ['id']
    }).then(function (data) {
      done(null, data);
    }).catch(function (err) {
      if (err)
        done(err);
    })
  }
}