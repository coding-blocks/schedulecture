/**
 * Created by tech4GT on 8/25/17.
 */
const models = require('../models')

module.exports = {

    createNew : function (name,date,startTime,endTime,topic,batchId,roomId,done) {
        models.lectures.create({
            name : name,
            date : date,
            startTime: startTime,
            endTime : endTime,
            topic : topic,
            batchId : batchId,
            roomId : roomId
        }).then(function (data) {
            done(null,data);
        }).catch(function (err) {
            if(err) done(err);
        });
    },
    getAll : function (done) {
        models.lectures.findAll({
        }).then(function (data) {
            done(null,data)
        }).catch(function (err) {
            if(err) done(err);
        });
    },
    search : function (id, done) {
        models.lectures.findOne({
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
        models.lectures.findOne(
            {
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
        models.lectures.destroy({
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