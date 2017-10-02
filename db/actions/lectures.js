/**
 * Created by tech4GT on 8/25/17.
 */
const models = require('../models')

module.exports = {

    createNew : function (name,date,startTime,endTime,batchId,roomId,teacherId,done) {
        models.Lectures.create({
            name : name,
            date : date,
            startTime: startTime,
            endTime : endTime,
            batchId : batchId,
            roomId : roomId,
            teacherId : teacherId
        }).then(function (data) {
            done(null,data);
        }).catch(function (err) {
            if(err) done(err);
        });
    },
    getAll : function (done) {
        models.Lectures.findAll({
        }).then(function (data) {
            done(null,data)
        }).catch(function (err) {
            if(err) done(err);
        });
    },
    search : function (id, done) {
        models.Lectures.findOne({
            where : {
                id : id
            }
        }).then(function (data) {
            done(null,data)
        }).catch(function (err) {
            if(err) done(err);
        });
    },
    edit : function (id,obj, done) {
        models.Lectures.findOne({
            where : {
                id : id
            }
        }).then(function (data) {
            if(!data){
                return done(null,null);
            }
            data.update(obj).then(function (resData) {
                done(null,resData);
            }).catch(function (err) {
                if(err) done(err);
            })
        }).catch(function (err) {
            if(err) done(err);
        });
    },
    deleteLecture : function (id, done) {
        models.Lectures.destroy({
            where : {
                id : id
            }
        }).then(function (data) {
            done(null,data)
        }).catch(function (err) {
            if(err) done(err);
        });
    }

}