/**
 * Created by abhishekyadav on 25/08/17.
 */

const express = require('express');
const router = express.Router();


router.post('/new',function (req,res) {
    db.actions.centres.createNew(req.body.name,function (data) {
        res.send(data);
    })
});


router.get('/',function (req,res) {
    db.actions.centres.getAll(function(data){
        res.send(data);
    })
});


router.get('/:id',function (req,res) {
    db.actions.centres.search(req.params.id,function (data) {
        res.send(data);
    })
});



router.put('/:id',function (req,res) {
    db.actions.centres.put(req.param.id,function(data){
        res.send(data);
    })
});

router.delete('/:id',function (req,res) {
    db.actions.centres.deleteCentre(req.param.id,function(data){
        res.send(data);
    })
});



module.exports = router;
