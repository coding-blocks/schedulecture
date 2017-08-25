/**
 * Created by abhishekyadav on 25/08/17.
 */
const express = require('express');
const router = express.Router();
const db = require('../../db');



router.post('/new',function (req,res) {
    db.actions.courses.createNew(req.body.name,req.body.desc,function (data) {
        res.send(data);
    })

});


router.get('/',function (req,res) {
    db.actions.courses.getAll(function(data){
        res.send(data);
    })
});


router.get('/:id',function (req,res) {
    db.actions.courses.search(req.param.id,function (data) {
        res.send(data);
    })
});



router.put('/:id',function (req,res) {

    db.actions.courses.put(req.param.id,req.body.values,function(data){
        res.send(data);
    })
});

router.delete('/:id',function (req,res) {
    db.actions.courses.deleteCourse(req.param.id,function(data){
        res.send(data);
    })
});

router.get('/:id/batches',function (req,res) {

})

router.put('/:id/batches',function (req,res) {

})




module.exports = router;
