/**
 * Created by abhishekyadav on 25/08/17.
 */
const express = require('express');
const router = express.Router();

const batches = require('./batches');
const teachers = require('./teachers');
const courses = require('./courses')
const centres= require('./centres')


router.get('/batches',batches);
router.get('/courses',courses);
router.get('/centres',centres);
router.get('/teachers',teachers);

module.exports={router};