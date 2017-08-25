/**
 * Created by abhishekyadav on 25/08/17.
 */

const express = require('express');
const router = express.Router();


route.post('/new',function (req,res) {
    res.send("posting a batch");
});


route.get('/',function (req,res) {
    res.send("getting all batches");
});


route.get('/:id',function (req,res) {
    res.send("getting a batch");
});



route.put('/:id',function (req,res) {
    res.send("putting a batch");

});

route.delete('/:id',function (req,res) {
    res.send("deleting a batch");

});



module.exports = router;
