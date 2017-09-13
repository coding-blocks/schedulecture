/**
 * Created by tld3112 on 13-Sep-17.
 */

const models = require('../models');

module.exports = {

    createTeacher : function (name, email, contact, done) {
        models.teachers.create({
            name : name,
            email : email,
            contact : contact
        }).then(function (data) {
            done(null, data);
        }).catch(function (err) {
            if(err) done(err);
        })
    },
    getAll : function (done) {
        models.teachers.findAll({
        }).then(function (data) {
            done(null, data)
        }).catch(function (err) {
            if(err) done(err);
        });
    },
    search : function (id, done) {
        models.teachers.findOne({
            where : {
                id : id
            }
        }).then(function (data) {
            done(null, data)
        }).catch(function (err) {
            if(err) done(err);
        });
    },
    edit : function (id,obj, done) {
        models.teachers.findOne({
            where : {
                id : id
            }
        }).then(function (data) {
            if(!data){
                return done(null, null);
            }
            data.update(obj).then(function (resData) {
                done(null, resData);
            }).catch(function (err) {
                if(err) done(err);
            })
        }).catch(function (err) {
            if(err) done(err);
        });
    },
    deleteTeacher : function (id, done) {
        models.teachers.destroy({
            where : {
                id : id
            }
        }).then(function (data) {
            done(null,data)
        }).catch(function (err) {
            if(err) done(err);
        });
    },
    getBatches : function (id, done) {
        models.batches.findAll({
            where : {
                teacherId : id
            }
        }).then(function (data) {
            done(null,data)
        }).catch(function (err) {
            if(err) done(err);
        });
    },
    getLectures : function (id, done) {
        models.lectures.findAll({
            where : {
                teacherId : id
            }
        }).then(function (data) {
            done(null,data)
        }).catch(function (err) {
            if(err) done(err);
        });
    }

};