/**
 * Created by tld3112 on 13-Sep-17.
 */

const express = require('express');
const router = express.Router();
const db = require('../../db');
const acl=require('../../utils/acl');


//add teacher
router.post('/new',acl.ensureadmin(), function(req, res){
    db.actions.teachers.createTeacher(req.body.name, req.body.email, req.body.contact, function(err, teacher){
        if(err){
            console.log("ERROR" + err);
            res.status(500).send({
                success : false,
                code : "500",
                error : {
                    message : "Could not add the teacher(Internal Server Error)."
                }
            });
        }
        else {
            if(teacher) {
                res.status(201).send({success : true, data : teacher.get()})
            } else {
                res.status(400).send({
                    success : false,
                    code : "400",
                    error : {
                        message: "Could not add the teacher(Incorrect Details)."
                    }
                })
            }
        }
    })
});

//get all teachers
router.get('/', function(req, res){
    db.actions.teachers.getAll(function(err, teachers){
        if(err){
            console.log("ERROR" + err);
            res.status(500).send({
                success: false,
                code: "500",
                error: {
                    message: "Could not get all the teachers(Internal Server Error)."
                }
            });
        } else {
            if (teachers.length !== 0) {
                res.status(200).send({success: true, data: teachers.map((teacher) => teacher.get())});
            } else {
                res.status(404).send({
                    success: false,
                    code: "404",
                    error: {
                        message: "There are no teachers."
                    }
                });
            }
        }
    })
});

//get teacher by id
router.get('/:id', function (req, res) {
    db.actions.teachers.search(req.params.id, function (err, teacher) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                code: "500",
                error: {
                    message: `Could not get the teacher with id ${req.params.id} (Internal Server Error).`
                }
            });
        }
        else {
            if (teacher) {
                res.status(200).send({success: true, data: teacher.get()});
            } else {
                res.status(404).send({
                    success: false,
                    code: "404",
                    error: {
                        message: `No teacher found for the id ${req.params.id}.`
                    }
                });
            }
        }
    })
});

//edit
router.put('/:id',acl.ensureadmin(), function (req, res) {
    db.actions.teachers.edit(req.params.id, req.body.values, function (err, teacher) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                code: "500",
                error: {
                    message: `Could not update the teacher with id ${req.params.id} (Internal Server Error).`
                }
            });
        }
        else {
            if (teacher) {
                res.status(201).send({success: true, data: teacher.get()});
            } else {
                res.status(400).send({
                    success: false,
                    code: "400",
                    error: {
                        message: `Could not update the teacher with id(Incorrect details)  ${req.params.id} .`
                    }
                });
            }
        }
    })
});

//delete teacher
router.delete('/:id',acl.ensureadmin(), function (req, res) {
    db.actions.teachers.deleteTeacher(req.params.id, function (err,teacherDeleted) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                code: "500",
                error: {
                    message: `Could not delete the teacher with id ${req.params.id} (Internal Server Error).`
                }
            });
        } else {
            if (teacherDeleted !== 0) {
                res.status(200).send({success: true})
            } else {
                res.status(404).send({
                    success: false,
                    code: "404",
                    error: {
                        message: `Could not delete the teacher with id ${req.params.id} (Teacher not found).`
                    }
                })
            }
        }
    })
});

//get batches
router.get('/:id/batches', function (req, res) {
    db.actions.teachers.getBatches(req.params.id, function (err, batches) {
        if (err) {
            console.log("ERROR" + err);
            res.status(500).send({
                success: false,
                code: "500",
                error: {
                    message: `Could not find the batches for teacher with id ${req.params.id} (Internal Server Error).`
                }
            });
        }
        else {
            if (batches.length !== 0) {
                res.status(200).send({success: true, data: batches.map((batch) => batch.get())});
            } else {
                res.status(404).send({
                    success: false,
                    code: "404",
                    error: {
                        message: `There are no batches for the teacher with id ${req.params.id}.`
                    }
                });
            }
        }
    })
});


router.get('/:id/lectures', function (req, res) {
    db.actions.teachers.getLectures(req.params.id, function (err, lectures) {
        if (err) {
            console.log("ERROR" + err);
            res.status(500).send({
                success: false,
                code: "500",
                error: {
                    message: `Could not find the lectures for teachers with id ${req.params.id} (Internal Server Error).`
                }
            });
        }
        else {
            if (lectures.length !== 0) {
                res.status(200).send({success: true, data: lectures.map((lecture) => lecture.get())});
            } else {
                res.status(404).send({
                    success: false,
                    code: "404",
                    error: {
                        message: `There are no lectures for the teacher with id ${req.params.id}.`
                    }
                });
            }
        }
    })
});


module.exports = router;