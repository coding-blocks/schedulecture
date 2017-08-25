/**
 *
 * Created by tech4GT on 8/25/17.
 */
const models = require('../models')
module.exports = {

    newBatch: function (name, startDate, endDate, size, courseId, centreId, done) {
        models.batches.findOne({
            name: name,
            startDate: JSON.parse(startDate),
            endDate: JSON.parse(endDate),
            size: size,
            courseId: courseId,
            centerId: centerId
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if (err) throw err
        });
    },
    getAll: function (done) {
        models.batches.finAdAll({}).then(function (data) {
            done(data)
        }).catch(function (err) {
            if (err) throw err;
        });
    },
    search: function (id, done) {
        db.models.batches.findOne({
            where: {
                id: id
            }
        }).then(function (data) {
            done(data)
        }).
        catch
        (function (err) {
            if (err) throw err;
        });
    },
    edit : function (id,obj, done) {
        models.batches.findOne({
            where : {
                id : id
            }
        }).then(function (data) {
            data.update(obj).then(function (resData) {
                done({
                    "status" : resData
                })
            }).catch(function (err) {
                if(err) throw err;
            })
        }).catch(function (err) {
            if(err) throw err;
        });
    },
    deleteCourse : function (id, done) {
        models.batches.destroy({
            where : {
                id : id
            }
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        });
    },
    getlectures : function (id, done) {
        models.lectures.findAll({
            where : {
                lectureId : id
            }
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        });
    }
}