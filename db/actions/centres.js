/**
 * Created by abhishekyadav on 25/08/17.
 */
const models = require('../models')

module.exports = {
  createNew: function (name, head, phone, done) {
    models.Centres.create({
      name: name,
      head: head,
      phone: phone
    }).then(function (data) {
      done(null, data)
    }).catch(function (err) {
      if (err) done(err);
    });
  },
  getAll: function (done) {
    models.Centres.findAll({}).then(function (data) {
      done(null, data)
    }).catch(function (err) {
      if (err) done(err);
    });
  },
  search: function (id, done) {
    models.Centres.findOne({
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
    models.Centres.findOne({
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
    models.Centres.destroy({
      where: {
        id: id
      }
    }).then(function (data) {
      done(null, data)
    }).catch(function (err) {
      if (err) done(err);
    });
  },
  getBatches: function (id, done) {
    models.Batches.findAll({
      where: {
        centreId: id
      },
      include:[models.Lectures]
    }).then(function (data) {
      done(null, data);
    }).catch(function (err) {
      if (err)
        done(err);
    })
  },
  getRooms: function (id, done) {
    models.Rooms.findAll({
      where: {
        centreId: id
      }
    }).then(function (data) {
      done(null, data);
    }).catch(function (err) {
      if (err)
        done(err);
    })
  }
}