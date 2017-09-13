/**
 * Created by abhishekyadav on 25/08/17.
 */

const express = require('express');
const router = express.Router();
const db = require('../../db');

/**
 *@api {post} /api/v1/batches/new POST /api/v1/batches/new
 * @apiName AddBatch
 * @apiGroup Batch
 * @apiParam {string} name
 * @apiParam {string} startDate starting date of course
 * @apiParam {string} endDate ending date of course
 * @apiParam {Number} size size of the batch
 * @apiParam {Number} courseId id of course of the batch
 * @apiParam {Number} centreId id of the centre
 * @apiSuccessExample {json} Success-Response:
 *
 *{
    "success": true,
    "data": {
        "id": 5,
        "name": "Pandora2017",
        "startDate": "2016-09-15T03:30:00.000Z",
        "endDate": "2016-09-15T03:30:00.000Z",
        "size": 50,
        "courseId": 1,
        "centreId": 1,
        "updatedAt": "2017-09-04T17:42:14.399Z",
        "createdAt": "2017-09-04T17:42:14.399Z"
    }
}
 */
router.post('/new', function (req, res) {
    db.actions.batches.newBatch(req.body.name, req.body.startDate, req.body.endDate, req.body.size, req.body.courseId,
        req.body.centreId, req.body.teacherId, function (err, batch) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: "Could not add the batch(Internal Server Error)."
                }
            })
        }
        else {
            if (batch) {
                res.status(201).send({success: true, data: batch.get()});
            } else {
                res.status(400).send({
                    success: false
                    , code: "400"
                    , error: {
                        message: "Could not add the batch(Incorrect Details)."
                    }
                })
            }
        }
    })
});

/**
 * @api {get} /api/v1/batches GET /api/v1/batches
 * @apiName GetBatches
 * @apiGroup Batch
 * @apiSuccessExample {json} Success-Response:
 * {
    "success": true,
    "data": [
        {
            "id": 5,
            "name": "Pandora2017",
            "startDate": "2016-09-15T03:30:00.000Z",
            "endDate": "2016-09-15T03:30:00.000Z",
            "size": 50,
            "createdAt": "2017-09-04T17:42:14.399Z",
            "updatedAt": "2017-09-04T17:42:14.399Z",
            "courseId": 1,
            "centreId": 1
        },
        {
            "id": 6,
            "name": "PandoraSummer",
            "startDate": "2016-09-15T03:30:00.000Z",
            "endDate": "2016-09-15T03:30:00.000Z",
            "size": 50,
            "createdAt": "2017-09-04T18:10:29.917Z",
            "updatedAt": "2017-09-04T18:10:29.917Z",
            "courseId": 1,
            "centreId": 1
        }
    ]
}
 *
 *
 */
router.get('/', function (req, res) {
    db.actions.batches.getAll({},function (err, batches) {
        if (err) {
            console.log("ERROR" + err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: "Could not get all the batches(Internal Server Error)."
                }
            })
        }
        else {
            if (batches.length !== 0) {
                res.status(200).send({success: true, data: batches.map((batch) => batch.get())});
            } else {
                res.status(404).send({
                    success: false
                    , code: "404"
                    , error: {
                        message: "There are no batches."
                    }
                })
            }
        }
    })
});

router.get('/active', function (req, res) {
    db.actions.batches.getAll({status : "active"}, function (err, activeBatches) {
        if (err) {
            console.log("ERROR" + err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: "Could not get all the active batches(Internal Server Error)."
                }
            })
        }
        else {
            if (activeBatches.length !== 0) {
                res.status(200).send({success: true, data: activeBatches.map((batch) => batch.get())});
            } else {
                res.status(404).send({
                    success: false
                    , code: "404"
                    , error: {
                        message: "There are no active batches."
                    }
                })
            }
        }
    })
});

router.get('/archived', function (req, res) {
    db.actions.batches.getAll({status : "archived"}, function (err, archivedBatches) {
        if (err) {
            console.log("ERROR" + err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: "Could not get all the archived batches(Internal Server Error)."
                }
            })
        }
        else {
            if (archivedBatches.length !== 0) {
                res.status(200).send({success: true, data: archivedBatches.map((batch) => batch.get())});
            } else {
                res.status(404).send({
                    success: false
                    , code: "404"
                    , error: {
                        message: "There are no archived batches."
                    }
                })
            }
        }
    })
});

/**
 * @api {get} /api/v1/batches/:id GET /api/v1/batches/:id
 * @apiName GetBatchById
 * @apiGroup Batch
 * @apiParam {number} id
 * @apiSuccessExample {json} Success-Response:
 * {
    "success": true,
    "data": {
        "id": 5,
        "name": "Pandora2017",
        "startDate": "2016-09-15T03:30:00.000Z",
        "endDate": "2016-09-15T03:30:00.000Z",
        "size": 50,
        "createdAt": "2017-09-04T17:42:14.399Z",
        "updatedAt": "2017-09-04T17:42:14.399Z",
        "courseId": 1,
        "centreId": 1
    }
}
 *
 *
 *
 */
router.get('/:id', function (req, res) {
    db.actions.batches.search(req.params.id, function (err, batch) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: `Could not get the batch with id ${req.params.id} (Internal Server Error).`
                }
            })
        }
        else {
            if (batch) {
                res.status(200).send({success: true, data: batch.get()});
            } else {
                res.status(404).send({
                    success: false
                    , code: "404"
                    , error: {
                        message: `No Batch found for the id ${req.params.id}.`
                    }
                })
            }
        }
    })
});


/**
 * @api {put} /api/v1/batches/:id PUT /api/v1/batches/:id
 * @apiName EditUser
 * @apiGroup Batch
 * @apiParam {Object} values updated batch object
 * @apiSuccessExample {json} Success-Response:
 *
 * {
    "success": true,
    "data": {
        "id": 5,
        "name": "PandoraSept",
        "startDate": "2016-09-15T03:30:00.000Z",
        "endDate": "2016-09-15T03:30:00.000Z",
        "size": "50",
        "createdAt": "2017-09-04T17:42:14.399Z",
        "updatedAt": "2017-09-04T18:13:40.005Z",
        "courseId": "1",
        "centreId": "1"
    }
}
 *
 *
 */
router.put('/:id', function (req, res) {
    db.actions.batches.edit(req.params.id, req.body.values, function (err, batch) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: `Could not update the batch with id ${req.params.id} (Internal Server Error).`
                }
            })
        }
        else {
            if (batch) {
                res.status(201).send({success: true, data: batch.get()});
            } else {
                res.status(400).send({
                    success: false
                    , code: "400"
                    , error: {
                        message: `Could not update the batch with batch id(Incorrect details)  ${req.params.id} .`
                    }
                })
            }
        }
    })
});

router.put('/archive/:id', function (req, res) {
    db.actions.batches.archiveBatch(req.params.id, function (err, batch) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: `Could not archive the batch with id ${req.params.id} (Internal Server Error).`
                }
            })
        }
        else {
            if (batch) {
                res.status(201).send({success: true, data: batch.get()});
            } else {
                res.status(400).send({
                    success: false
                    , code: "400"
                    , error: {
                        message: `Could not archive the batch with batch id(Incorrect details)  ${req.params.id} .`
                    }
                })
            }
        }
    })
});

/**
 * @api {delete} /api/v1/batches/:id  DELETE /api/v1/batches/:id
 * @apiName DeleteBatch
 * @apiGroup Batch
 * @apiParam {Number} id batch by id
 * @apiSuccessExample {json} Success-Response:
 *
 * {
    "success": true
}
 */
router.delete('/:id', function (req, res) {
    db.actions.batches.deleteBatch(req.params.id, function (err,batchDeleted) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: `Could not delete the batch with id ${req.params.id} (Internal Server Error).`
                }
            })

        } else {
            if (batchDeleted !== 0) {
                res.status(200).send({success: true})
            } else {
                res.status(404).send({
                    success: false
                    , code: "404"
                    , error: {
                        message: `Could not delete the batch with id ${req.params.id} (Batch not found).`
                    }
                })
            }
        }
    })
});

/**
* @api {put} /api/v1/batches/:id/lectures PUT /api/v1/batches/:id/lectures
* @apiName GetLecturesOfBatchById
* @apiGroup Batch
* @apiParam {Number} id batch by id
 * @apiSuccessExample {json} Success-Response:
 *
 *{
    "success": true,
    "data": [
        {
            "id": 2,
            "name": "Lecture 4",
            "date": "2016-09-15T03:30:00.000Z",
            "startTime": "2016-09-15T03:30:00.000Z",
            "endTime": "2016-09-15T03:30:00.000Z",
            "topic": "Actifsvssfvfv",
            "createdAt": "2017-09-04T18:19:53.405Z",
            "updatedAt": "2017-09-04T18:19:53.405Z",
            "batchId": 7,
            "roomId": null
        },
        {
            "id": 3,
            "name": "Lecture 5",
            "date": "2016-09-15T03:30:00.000Z",
            "startTime": "2016-09-15T03:30:00.000Z",
            "endTime": "2016-09-15T03:30:00.000Z",
            "topic": "Actifsvssfvfv",
            "createdAt": "2017-09-04T18:20:47.552Z",
            "updatedAt": "2017-09-04T18:20:47.552Z",
            "batchId": 7,
            "roomId": null
        },
        {
            "id": 4,
            "name": "Lecture 6",
            "date": "2016-09-15T03:30:00.000Z",
            "startTime": "2016-09-15T03:30:00.000Z",
            "endTime": "2016-09-15T03:30:00.000Z",
            "topic": "Fragments",
            "createdAt": "2017-09-04T18:55:36.882Z",
            "updatedAt": "2017-09-04T18:55:36.882Z",
            "batchId": 7,
            "roomId": null
        },
        {
            "id": 5,
            "name": "Lecture 6",
            "date": "2016-09-15T03:30:00.000Z",
            "startTime": "2016-09-15T03:30:00.000Z",
            "endTime": "2016-09-15T03:30:00.000Z",
            "topic": "Fragments",
            "createdAt": "2017-09-04T18:56:38.928Z",
            "updatedAt": "2017-09-04T18:56:38.928Z",
            "batchId": 7,
            "roomId": null
        },
        {
            "id": 7,
            "name": "Lecture 6",
            "date": "2016-09-15T03:30:00.000Z",
            "startTime": "2016-09-15T03:30:00.000Z",
            "endTime": "2016-09-15T03:30:00.000Z",
            "topic": "updated object",
            "createdAt": "2017-09-04T18:57:10.053Z",
            "updatedAt": "2017-09-04T18:59:34.881Z",
            "batchId": 7,
            "roomId": null
        }
    ]
}
 */
router.get('/:id/lectures', function (req, res) {
    db.actions.batches.getLectures(req.params.id, function (err, lectures) {
        if (err) {
            console.log("ERROR" + err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: `Could not find the lectures for batch with id ${req.params.id} (Internal Server Error).`
                }
            })
        }
        else {
            if (lectures.length !== 0) {
                res.status(200).send({success: true, data: lectures.map((lecture) => lecture.get())});
            } else {
                res.status(404).send({
                    success: false
                    , code: "404"
                    , error: {
                        message: `There are no lectures for batch with id ${req.params.id}.`
                    }
                })
            }
        }
    })
});


module.exports = router;
