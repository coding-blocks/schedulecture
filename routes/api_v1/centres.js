/**
 * Created by abhishekyadav on 25/08/17.
 */

const express = require('express');
const router = express.Router();
const db = require('../../db');


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
    db.actions.centres.edit(req.params.id,JSON.parse(req.body.values),function(data){
        res.send(data);
    })
});

router.delete('/:id',function (req,res) {
    db.actions.centres.deleteCentre(req.params.id,function(data){
        if(data>0){
            return res.status(200).send({success: true});
        }
        return res.status(204).send();

    })
});



module.exports = router;
