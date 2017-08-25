/**
 * Created by abhishekyadav on 25/08/17.
 */

const express = require('express');
const router = express.Router();
const db = require('../../db');


router.post('/new',function (req,res) {
    db.actions.batches.newBatch(req.body.name,req.body.startDate,req.body.enddate,req.body.size,req.body.courseId,req.body.centreId,function (data) {
        res.send(data);
    })
});


router.get('/',function (req,res) {
    db.actions.batches.getAll(function(data){
        res.send(data);
    })
});


router.get('/:id',function (req,res) {
    db.actions.batches.search(req.param.id,function (data) {
        res.send(data);
    })
});



router.put('/:id',function (req,res) {
    res.send("putting a batch");

});

router.delete('/:id',function (req,res) {
    res.send("deleting a batch");

});

router.get('/:id/lectures',function(req,res){

})
router.put('/:id/lectures',function(req,res){

})


module.exports = router;
