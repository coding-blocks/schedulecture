/**
 * Created by abhishekyadav on 25/08/17.
 */

const express = require('express');
const router = express.Router();
const db = require('../../db');


/**
 *@api {post} /api/v1/centres/new POST /api/v1/centres/new
 * @apiName AddCentre
 * @apiGroup Centre
 * @apiParam {string} name
 * @apiSuccessExample {json} Success-Response:
 * {
    "success": true,
    "data": {
        "id": 2,
        "name": "Dwarka",
        "updatedAt": "2017-09-04T18:42:59.639Z",
        "createdAt": "2017-09-04T18:42:59.639Z"
    }
}
 *
 *
 */
router.post('/new', function (req, res) {
    db.actions.centres.createNew(req.body.name, req.body.head, req.body.phone, function (err, centre) {
        if (err) {
            console.log("ERROR" + err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: "Could not add the centre(Internal Server Error)."
                }
            })
        }
        else {
            if (centre) {
                res.status(201).send({success: true, data: centre.get()});
            } else {
                res.status(400).send({
                    success: false
                    , code: "400"
                    , error: {
                        message: "Could not add the centre(Incorrect Details)."
                    }
                })
            }

        }
    })
});

/**
 * @api {get} /api/v1/centres GET /api/v1/centres
 * @apiName GetCentres
 * @apiGroup Centre
 * @apiSuccessExample {json} Success-Response:
 *
 * {
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "PitamPura",
            "createdAt": "2017-09-04T17:35:27.545Z",
            "updatedAt": "2017-09-04T17:35:27.545Z"
        },
        {
            "id": 2,
            "name": "Dwarka",
            "createdAt": "2017-09-04T18:42:59.639Z",
            "updatedAt": "2017-09-04T18:42:59.639Z"
        }
    ]
}
 *
 */
router.get('/', function (req, res) {
    db.actions.centres.getAll(function (err, centres) {
        if (err) {
            console.log("ERROR" + err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: "Could not get all the centres(Internal Server Error)."
                }
            })
        }
        else {
            if (centres.length !== 0) {
                res.status(200).send({success: true, data: centres.map((centre) => centre.get())});
            } else {
                res.status(404).send({
                    success: false
                    , code: "404"
                    , error: {
                        message: "There are no centres."
                    }
                })
            }
        }
    })
});

/**
 * @api {get} /api/v1/centres/:id GET /api/v1/centres/:id
 * @apiName GetCentresById
 * @apiGroup Centre
 * @apiParam {number} id
 * @apiSuccessExample {json} Success-Response:
 *
 * {
    "success": true,
    "data": {
        "id": 1,
        "name": "PitamPura",
        "createdAt": "2017-09-04T17:35:27.545Z",
        "updatedAt": "2017-09-04T17:35:27.545Z"
    }
}
 *
 *
 */
router.get('/:id', function (req, res) {
    db.actions.centres.search(req.params.id, function (err, centre) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: `Could not get the centre with id ${req.params.id} (Internal Server Error).`
                }
            })
        }
        else {
            if (centre) {
                res.status(200).send({success: true, data: centre.get()});
            } else {
                res.status(404).send({
                    success: false
                    , code: "404"
                    , error: {
                        message: `No centre found for the id ${req.params.id}.`
                    }
                })
            }
        }
    })
});


/**
 * @api {put} /api/v1/centres/:id PUT /api/v1/centres/:id
 * @apiName EditCentre
 * @apiGroup Centre
 * @apiParam {Object} values updated centre object
 * @apiSuccessExample {json} Success-Response:
 *
 * {
    "success": true,
    "data": {
        "id": 2,
        "name": "Dwarka Sec-11",
        "createdAt": "2017-09-04T18:42:59.639Z",
        "updatedAt": "2017-09-04T18:44:31.624Z"
    }
}
 */
router.put('/:id', function (req, res) {
    db.actions.centres.edit(req.params.id, req.body.values, function (err, centre) {

        if (err) {
            console.log(err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: `Could not update the centre with id ${req.params.id} (Internal Server Error).`
                }
            })
        }
        else {
            if (centre) {
                res.status(201).send({success: true, data: centre.get()});
            } else {
                res.status(400).send({
                    success: false
                    , code: "400"
                    , error: {
                        message: `Could not update the centre with centre id(Incorrect details)  ${req.params.id} .`
                    }
                })
            }
        }
    })
});


/**
 * @api {delete} /api/v1/centres/:id DELETE /api/v1/centres/:id
 * @apiName DeleteCentre
 * @apiGroup Centre
 * @apiParam {number} id
 * @apiSuccessExample {json} Success-Response:
 *
 * {
    "success": true
}
 */
router.delete('/:id', function (req, res) {
    db.actions.centres.deleteCentre(req.params.id, function (err, centreDeleted) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false
                , code: "500"
                , error: {
                    message: `Could not delete the centre with id ${req.params.id} (Internal Server Error).`
                }
            })

        } else {
            if (centreDeleted !== 0) {
                res.status(200).send({success: true})
            } else {
                res.status(404).send({
                    success: false
                    , code: "404"
                    , error: {
                        message: `Could not delete the centre with id ${req.params.id} (Centre not found).`
                    }
                })
            }
        }

    })
});

// get all batches
router.get('/:id/batches', function (req, res) {
    db.actions.centres.getBatches(req.params.id, function(err, batches) {
        if(err){
            console.log("ERROR" + err);
            res.status(500).send({
                success : false,
                code : "500",
                error : {
                    message : `Could not find the batches for centre with id ${req.params.id} (Internal Server Error).`
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
                        message : `There are no batches for centre with id ${req.params.id}.`
                    }

                })
            }
        }
    })
});

//get all rooms
router.get('/:id/rooms', function(req, res) {
    db.actions.centres.getRooms(req.params.id, function(err, rooms){
        if(err){
            console.log("ERROR" + err);
            res.status(500).send({
                success : false,
                code : "500",
                error : {
                    message : `Could not find the rooms for centre with id ${req.params.id} (Internal Server Error).`
                }
            });
        } else {
            if(rooms.length !== 0){
                res.status(200).send({
                    success : true,
                    data : rooms.map((room) => room.get())
                });
            } else {
                res.status(404).send({
                    success : false,
                    code : "404",
                    error : {
                        message : `There are no rooms for centre with id ${req.params.id}.`
                    }
                })
            }
        }
    })
})

module.exports = router;
