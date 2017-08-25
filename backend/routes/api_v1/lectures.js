/**
 * Created by abhishekyadav on 25/08/17.
 */
const express = require('express');
const router = express.Router();
const db = require('../../db');



router.post('/new',function (req,res) {
    req.body.date = JSON.parse(req.body.date)
    req.body.startTime = JSON.parse(req.body.startTime)
    req.body.endTime = JSON.parse(req.body.endTime)
    db.actions.lectures.createNew(req.body.name,req.body.date,startTime,endTime,topic,function (data) {
        res.send(data);
    })

});


router.get('/',function (req,res) {
    db.actions.lectures.getAll(function(data){
        res.send(data);
    })
});

router.put('/',function (req, res) {
    (function(callback) {
        req.body.lectures.forEach(function (x) {
            db.actions.lectures.edit(x.id,x,)
        })
        callback();
    })(data=>res.send(data))
})


router.get('/:id',function (req,res) {
    db.actions.lectures.search(req.param.id,function (data) {
        res.send(data);
    })
});



router.put('/:id',function (req,res) {
    db.actions.lectures.edit(req.param.id,req.body.values,function(data){
        res.send(data);
    })
});

router.delete('/:id',function (req,res) {
    db.actions.lectures.deleteLecture(req.param.id,function(data){
        res.send(data);
    })
});



module.exports = router;
