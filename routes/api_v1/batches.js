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
    db.actions.batches.newBatch(req.body.name, req.body.startDate, req.body.endDate, req.body.size, req.body.courseId, req.body.centreId, function (err, batch) {
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
    db.actions.batches.getAll(function (err, batches) {
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

router.get('/:id/lectures', function (req, res) {
    db.actions.batches.getlectures(req.params.id, function (err, data) {
        res.send(data);
    })
});


module.exports = router;
