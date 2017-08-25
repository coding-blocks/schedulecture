/**
 * Created by abhishekyadav on 25/08/17.
 */
const express = require('express');
const router = express.Router();


route.post('/new',function (req,res) {
    res.send("posting a course");
});


route.get('/',function (req,res) {
    res.send("getting all courses");
});


route.get('/:id',function (req,res) {
    res.send("getting a course");
});



route.put('/:id',function (req,res) {
    res.send("putting a course");

});

route.delete('/:id',function (req,res) {
    res.send("deleting a course");

});



module.exports = router;
