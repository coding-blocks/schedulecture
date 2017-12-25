/**
 *
 * Created by tech4GT on 8/25/17.
 */
const models = require('../models')
module.exports = {

  newBatch: function (name, startDate, endDate, size, noOfLectures, lectureShortCode, hoursPerLecture, defaultTime, courseId, centreId, teacherId, roomId, done) {
    models.Batches.create({
      name: name,
      startDate: startDate,
      endDate: endDate,
      size: size,
      noOfLectures: noOfLectures,
      lectureShortCode: lectureShortCode,
      hoursPerLecture: hoursPerLecture,
      defaultTime: defaultTime,
      status: "active",
      courseId: courseId,
      centreId: centreId,
      teacherId: teacherId,
      roomId: roomId
    }).then(function (data) {
      done(null, data)
    }).catch(function (err) {
      if (err) done(err);
    });
  },
  getAll: function (conditions, done) {
    models.Batches.findAll({
      where: conditions,
      include: [models.Centres, models.Courses, models.Teachers, models.Lectures, models.Rooms],
      order: ['id']
    }).then(function (data) {

      done(null, data)
    }).catch(function (err) {
      if (err) done(err);
    });
  },
  search: function (id, done) {
    models.Batches.findOne({
      where: {
        id: id
      }, include:
        [
          models.Centres, models.Courses, models.Teachers, models.Rooms,
          {model: models.Lectures, include: [models.Teachers, models.Rooms], order: [['id']]}]

    }).then(function (data) {
      done(null, data);
    }).catch(function (err) {
      if (err) done(err);
    });
  },
  edit: function (id, obj, done) {
    models.Batches.findOne({
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
  archiveBatch: function (id, done) {
    models.Batches.findOne({
      where: {
        id: id
      }
    }).then(function (data) {
      if (!data) {
        return done(null, null)
      }
      data.update({
        status: "archived"
      }).then(function (resData) {
        done(null, resData);
      }).catch(function (err) {
        if (err) done(err);
      })
    }).catch(function (err) {
      if (err) done(err);
    });
  },
  deleteBatch: function (id, done) {
    models.Batches.destroy({
      where: {
        id: id
      }
    }).then(function (data) {
      done(null, data)
    }).catch(function (err) {
      if (err) done(err);
    });
  }
  ,
  getLectures: function (id, done) {
    models.Lectures.findAll({
      where: {
        batchId: id
      },
      order: ['id']
    }).then(function (data) {
      done(null, data)
    }).catch(function (err) {
      if (err) done(err);
    });
  }
}