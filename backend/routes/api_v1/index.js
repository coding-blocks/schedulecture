/**
 * Created by abhishekyadav on 25/08/17.
 */
const express = require('express');
const router = express.Router();

const batches = require('./batches');
const teachers = require('./teachers');
const courses = require('./courses')
const centres = require('./centres')
const lectures = require('./lectures')


router.use('/lectures', lectures);
router.use('/batches', batches);
router.use('/courses', courses);
router.use('/centres', centres);
router.use('/teachers', teachers);

module.exports = router