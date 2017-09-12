/**
 * Created by tld3112 on 13-Sep-17.
 */

const express = require('express');
const router = express.Router();
const db = require('../../db');

//add room
router.post('/new', function (req, res) {
    db.actions.rooms.createNew(req.body.name, req.body.capacity, req.body.config, req.body.centreId, function (err, room) {
        if (err) {
            console.log("ERROR" + err);
            res.status(500).send({
                success: false,
                code: "500",
                error: {
                    message: "Could not add the room(Internal Server Error)."
                }
            })
        }
        else {
            if (room) {
                res.status(201).send({success: true, data: room.get()});
            } else {
                res.status(400).send({
                    success: false,
                    code: "400",
                    error: {
                        message: "Could not add the room(Incorrect Details)."
                    }
                })
            }

        }
    })
});

//get all rooms
router.get('/', function (req, res) {
    db.actions.rooms.getAll(function (err, rooms) {
        if (err) {
            console.log("ERROR" + err);
            res.status(500).send({
                success: false,
                code: "500",
                error: {
                    message: "Could not get all the rooms(Internal Server Error)."
                }
            })
        }
        else {
            if (rooms.length !== 0) {
                res.status(200).send({success: true, data: rooms.map((room) => room.get())});
            } else {
                res.status(404).send({
                    success: false,
                    code: "404",
                    error: {
                        message: "There are no rooms."
                    }
                })
            }
        }
    })
});

//get room by id
router.get('/:id', function (req, res) {
    db.actions.rooms.search(req.params.id, function (err, room) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                code: "500",
                error: {
                    message: `Could not get the room with id ${req.params.id} (Internal Server Error).`
                }
            })
        }
        else {
            if (room) {
                res.status(200).send({success: true, data: room.get()});
            } else {
                res.status(404).send({
                    success: false,
                    code: "404",
                    error: {
                        message: `No room found for the id ${req.params.id}.`
                    }
                })
            }
        }
    })
});

//edit room
router.put('/:id', function (req, res) {
    db.actions.rooms.edit(req.params.id, req.body.values, function (err, room) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                code: "500",
                error: {
                    message: `Could not update the room with id ${req.params.id} (Internal Server Error).`
                }
            })
        }
        else {
            if (room) {
                res.status(201).send({success: true, data: room.get()});
            } else {
                res.status(400).send({
                    success: false,
                    code: "400",
                    error: {
                        message: `Could not update the room with room id(Incorrect details)  ${req.params.id} .`
                    }
                })
            }
        }
    })
});

//delete room
router.delete('/:id', function (req, res) {
    db.actions.rooms.deleteRoom(req.params.id, function (err, roomDeleted) {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                code: "500",
                error: {
                    message: `Could not delete the room with id ${req.params.id} (Internal Server Error).`
                }
            })

        } else {
            if (roomDeleted !== 0) {
                res.status(200).send({success: true})
            } else {
                res.status(404).send({
                    success: false,
                    code: "404",
                    error: {
                        message: `Could not delete the room with id ${req.params.id} (Room not found).`
                    }
                })
            }
        }

    })
});


module.exports = router;
