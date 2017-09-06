/**
 * Created by tech4GT on 8/25/17.
 */

const models = require('../models')

module.exports = {
    createNew : function (name,desc,done) {
        models.Courses.create({
            name : name,
            desc : desc
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        });
    },
    getAll : function (done) {
        models.Courses.findAll({
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        });
    },
    search : function (id, done) {
        models.Courses.findOne({
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
        models.Courses.findOne({
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
        models.Courses.destroy({
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
        models.Courses.findOne({
            where : {
                id : id
            },
            include:[{
                model:models.batches,
                include:[{
                    model:models.lectures
                }]
            }]
        }).then(function (data) {
            var arr=[];
            var batches=data.dataValues.batches;
            for(var i in batches){
                var lectures=batches[i].lectures;
                for(var j in lectures){
                    arr.push(lectures[j].dataValues);
                }
            }
            done(arr);

        }).catch(function (err) {
            if(err) throw err;
        });
    }

}