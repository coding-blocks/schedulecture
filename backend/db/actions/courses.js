/**
 * Created by tech4GT on 8/25/17.
 */

const models = require('../models')

module.exports = {
    createNew : function (name,desc,done) {
        models.courses.create({
            name : name,
            desc : desc
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        });
    },
    getAll : function (done) {
        models.courses.findAll({
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        });
    },
    search : function (id, done) {
        models.courses.findOne({
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
        models.courses.findOne({
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
        model.courses.destroy({
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