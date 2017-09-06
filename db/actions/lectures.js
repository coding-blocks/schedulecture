/**
 * Created by tech4GT on 8/25/17.
 */
const models = require('../models')

module.exports = {

    createNew : function (name,date,startTime,endTime,topic,batchId,roomId,done) {
        models.Lectures.create({
            name : name,
            date : date,
            startTime: startTime,
            endTime : endTime,
            topic : topic,
            batchId : batchId,
            roomId : roomId
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        });
    },
    getAll : function (done) {
        models.Lectures.findAll({
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        });
    },
    search : function (id, done) {
        models.Lectures.findOne({
            where : {
                id : id
            }
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        });
    },
    edit : function (id,obj, done) {
        models.Lectures.findOne(
            {
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
    deleteLecture : function (id, done) {
        models.Lectures.destroy({
            where : {
                id : id
            }
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        });
    }

}