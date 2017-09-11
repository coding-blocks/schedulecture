/**
 * Created by tech4GT on 8/25/17.
 */

const models = require('../models')

module.exports = {
    createNew : function (name,desc,lect,hours,done) {
        models.courses.create({
            name : name,
            desc : desc,
            lect : lect,
            hours : hours
        }).then(function (data) {
            done(null,data)
        }).catch(function (err) {
            if(err) done(err);
        });
    },
    getAll : function (done) {
        models.courses.findAll({
        }).then(function (data) {
            done(null,data)
        }).catch(function (err) {
            if(err) done(err);
        });
    },
    search : function (id, done) {
        models.courses.findOne({
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
        models.courses.findOne({
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
    deleteCourse : function (id, done) {
        models.courses.destroy({
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