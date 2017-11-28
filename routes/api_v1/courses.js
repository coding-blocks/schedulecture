/**
 * Created by abhishekyadav on 25/08/17.
 */
const express = require('express');
const router = express.Router();
const db = require('../../db');
const acl=require('../../utils/acl');
const passport=require('../../auth/passport');



/**
 *@api {post} /api/v1/courses/new POST /api/v1/courses/new
 * @apiName AddCourse
 * @apiGroup Course
 * @apiParam {string} name
 * @apiParam {string} desc description of the course
 * @apiSuccessExample {json} Success-Response:
 * {
    "success": true,
    "data": {
        "id": 1,
        "name": "Pandora",
        "desc": "Android course",
        "updatedAt": "2017-09-04T17:04:07.780Z",
        "createdAt": "2017-09-04T17:04:07.780Z"
    }
}
 */
router.post('/new',passport.authenticate('bearer'), function (req, res) {
    db.actions.courses.createNew(req.body.name, req.body.desc, req.body.lect, req.body.hours, function (err, course) {
        if (err) {
            console.log("ERROR" + err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: "Could not add the course(Internal Server Error)."
                }
            })
        }
        else {
            if (course) {
                res.status(201).send({success: true, data: course.get()});
            } else {
                res.status(400).send({
                    success: false
                    , code: "400"
                    , error: {
                        message: "Could not add the course(Incorrect Details)."
                    }
                })
            }

        }
    })

});

/**
 * @api {get} /api/v1/courses GET /api/v1/courses
 * @apiName GetCourses
 * @apiGroup Course
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "Pandora",
            "desc": "Android course",
            "createdAt": "2017-09-04T17:27:05.166Z",
            "updatedAt": "2017-09-04T17:27:05.166Z"
        },
        {
            "id": 2,
            "name": "Launchpad",
            "desc": "cpp course",
            "createdAt": "2017-09-04T17:27:16.684Z",
            "updatedAt": "2017-09-04T17:27:16.684Z"
        }
    ]
}
 *
 */
router.get('/', function (req, res) {
    db.actions.courses.getAll(function (err, courses) {
        if (err) {
            console.log("ERROR" + err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: "Could not get all the courses(Internal Server Error)."
                }
            })
        }
        else {
            if (courses.length !== 0) {
                res.status(200).send({success: true, data: courses.map((course) => course.get())});
            } else {
                res.status(404).send({
                    success: false
                    , code: "404"
                    , error: {
                        message: "There are no courses."
                    }
                })
            }
        }
    })
});

/**
 * @api {get} /api/v1/courses/:id GET /api/v1/courses/:id
 * @apiName GetCourseById
 * @apiGroup Course
 * @apiParam {number} id
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true,
    "data": {
        "id": 2,
        "name": "Launchpad",
        "desc": "cpp course",
        "createdAt": "2017-09-04T17:27:16.684Z",
        "updatedAt": "2017-09-04T17:27:16.684Z"
    }
}
 */
router.get('/:id', function (req, res) {
    db.actions.courses.search(req.params.id, function (err, course) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: `Could not get the course with id ${req.params.id} (Internal Server Error).`
                }
            })
        }
        else {
            if (course) {
                res.status(200).send({success: true, data: course.get()});
            } else {
                res.status(404).send({
                    success: false
                    , code: "404"
                    , error: {
                        message: `No Course found for the id ${req.params.id}.`
                    }
                })
            }
        }
    })
});


/**
 * @api {put} /api/v1/courses/:id PUT /api/v1/courses/:id
 * @apiName EditCourse
 * @apiGroup Course
 * @apiParam {Object} values updated course object
 * @apiSuccessExample {json} Success-Response:
 * {
    "success": true,
    "data": {
        "id": 2,
        "name": "LaunchPad",
        "desc": "c++ course",
        "createdAt": "2017-09-04T17:27:16.684Z",
        "updatedAt": "2017-09-04T17:28:41.917Z"
    }
}
 */
router.put('/:id',passport.authenticate('bearer'), function (req, res) {
    db.actions.courses.edit(req.params.id, req.body.values, function (err, course) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: `Could not update the course with id ${req.params.id} (Internal Server Error).`
                }
            })
        }
        else {
            if (course) {
                res.status(201).send({success: true, data: course.get()});
            } else {
                res.status(400).send({
                    success: false
                    , code: "400"
                    , error: {
                        message: `Could not update the course with course id(Incorrect details)  ${req.params.id} .`
                    }
                })
            }
        }
    })
});


/**
 * @api {delete} /api/v1/courses/:id DELETE /api/v1/courses/:id
 * @apiName DeleteCourse
 * @apiGroup Course
 * @apiParam {number} id
 *
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true
}
 */
router.delete('/:id',passport.authenticate('bearer'), function (req, res) {
    db.actions.courses.deleteCourse(req.params.id, function (err, courseDeleted) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: `Could not delete the course with id ${req.params.id} (Internal Server Error).`
                }
            })

        } else {
            if (courseDeleted !== 0) {
                res.status(200).send({success: true})
            } else {
                res.status(404).send({
                    success: false
                    , code: "404"
                    , error: {
                        message: `Could not delete the course with id ${req.params.id} (Course not found).`
                    }
                })
            }
        }
    })
});

// get all batches
router.get('/:id/batches', function (req, res) {
    db.actions.courses.getBatches(req.params.id, function(err, batches) {
        if(err){
            console.log("ERROR" + err);
            res.status(500).send({
                success : false,
                code : "500",
                error : {
                    message : `Could not find the batches for course with id ${req.params.id} (Internal Server Error).`
                }
            });
        } else {
            if(batches.length !== 0){
                res.status(200).send({
                    success : true,
                    data : batches.map((batch) => batch.get())
                });
            } else {
                res.status(404).send({
                    success : false,
                    code : "404",
                    error : {
                        message : `There are no batches for course with id ${req.params.id}.`
                    }

                })
            }
        }
    })
});


module.exports = router;
