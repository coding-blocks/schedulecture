/**
 * Created by abhishekyadav on 25/08/17.
 */
const models = require('../models')

module.exports={
    createNew : function (name,done) {
        models.centres.create({
            name : name
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        });
    },
    getAll : function (done) {
        models.centres.findAll({
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        });
    },
    search : function (id, done) {
        models.centres.findOne({
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
        models.centres.findOne({
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
    deleteCentre : function (id, done) {
        model.centres.destroy({
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