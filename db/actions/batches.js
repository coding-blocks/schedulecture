/**
 *
 * Created by tech4GT on 8/25/17.
 */
const models = require('../models')
module.exports = {

    newBatch: function (name, startDate, endDate, size, courseId, centerId, done) {
        models.Batches.create({
            name: name,
            startDate: startDate,
            endDate: endDate,
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
        models.Batches.findAll({}).then(function (data) {
            done(data)
        }).catch(function (err) {
            if (err) throw err;
        });
    },
    search: function (id, done) {
        models.Batches.findOne({
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
        models.Batches.findOne({
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
    deleteBatch : function (id, done) {
        models.Batches.destroy({
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
        models.Lectures.findAll({
            where : {
                batchId : id
            }
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        });
    }
}