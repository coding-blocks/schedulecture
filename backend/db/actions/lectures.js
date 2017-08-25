/**
 * Created by tech4GT on 8/25/17.
 */
const models = require('../models')

module.exports = {
    createNew : function (name,date,startTime,endTime,topic,done) {
        models.lectures.create({
            name : name,
            date : date,
            startTime: startTime,
            endTime : endTime,
            topic : topic
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        });
    },
    getAll : function (done) {
        models.lectures.findAll({
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        });
    },
    search : function (id, done) {
        models.lectures.findOne({
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
        models.lectures.update(obj,
            {
            where : {
                id : id
            },
            returning:true
        }).then(function (data) {
            done({
                "status" : data
            })
        }).catch(function (err) {
            if(err) throw err;
        });
    },
    deleteLecture : function (id, done) {
        models.courses.destroy({
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