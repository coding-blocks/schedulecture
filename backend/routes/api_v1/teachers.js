/**
 * Created by abhishekyadav on 25/08/17.
 */
const express = require('express');
const router = express.Router();


router.post('/new',function (req,res) {
    res.send("posting a batch");
});


router.get('/',function (req,res) {
    res.send("getting all batches");
});


router.get('/:id',function (req,res) {
    res.send("getting a batch");
});



router.put('/:id',function (req,res) {
    res.send("putting a batch");

});

router.delete('/:id',function (req,res) {
    res.send("deleting a batch");

});



module.exports = router;
