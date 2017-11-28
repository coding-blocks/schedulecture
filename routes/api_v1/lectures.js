/**
 * Created by abhishekyadav on 25/08/17.
 */
const express = require('express');
const router = express.Router();
const db = require('../../db');
const acl=require('../../utils/acl');



/**
 *@api {post} /api/v1/lectures/new POST /api/v1/lectures/new
 * @apiName AddLecture
 * @apiGroup Lecture
 * @apiParam {string} name name of the lecture
 * @apiParam {string} date date of the lecture
 * @apiParam {string} startTime starting time of the lecture
 * @apiParam {string} endTime ending time of the lecture
 * @apiParam {number} batchId batch id  of lecture
 * @apiParam {number} roomId room id of lecture
 * @apiSuccessExample {json} Success-Response:
 *
 * {
    "success": true,
    "data": {
        "id": 8,
        "name": "Lecture 9",
        "date": "2016-09-15T03:30:00.000Z",
        "startTime": "2016-09-15T03:30:00.000Z",
        "endTime": "2016-09-15T03:30:00.000Z",
        "batchId": 7,
        "roomId": null,
        "updatedAt": "2017-09-04T18:57:44.614Z",
        "createdAt": "2017-09-04T18:57:44.614Z"
    }
}
 *
 *
 */
router.post('/new',passport.authenticate('bearer'), function (req, res) {

  req.body.date = req.body.hasOwnProperty('date') ? (new Date(req.body.date)) : null;

  req.body.startTime = req.body.hasOwnProperty('startTime') ? (new Date(req.body.startTime)) : null;

  req.body.endTime = req.body.hasOwnProperty('endTime') ? (new Date(req.body.endTime)) : null;


  db.actions.lectures.createNew(req.body.name, req.body.date, req.body.startTime, req.body.endTime, req.body.batchId,
    req.body.roomId, req.body.teacherId, function (err, lecture) {

      if (err) {
        console.log("ERROR" + err);
        res.status(500).send({
          success: false
          , code: "500"
          , error: {
            message: "Could not add the lecture(Internal Server Error)."
          }
        })
      }
      else {
        if (lecture) {
          res.status(201).send({success: true, data: lecture.get()});
        } else {
          res.status(400).send({
            success: false
            , code: "400"
            , error: {
              message: "Could not add the lecture(Incorrect Details)."
            }
          })
        }

      }

    })

});

/**
 * @api {get} /api/v1/lectures GET /api/v1/lectures
 * @apiName GetLectures
 * @apiGroup Lecture
 * @apiSuccessExample {json} Success-Response:
 *
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
            "createdAt": "2017-09-04T18:56:38.928Z",
            "updatedAt": "2017-09-04T18:56:38.928Z",
            "batchId": 7,
            "roomId": null
        },
        {
            "id": 7,
            "name": "Lecture 8",
            "date": "2016-09-15T03:30:00.000Z",
            "startTime": "2016-09-15T03:30:00.000Z",
            "endTime": "2016-09-15T03:30:00.000Z",
            "createdAt": "2017-09-04T18:57:10.053Z",
            "updatedAt": "2017-09-04T18:57:10.053Z",
            "batchId": 7,
            "roomId": null
        },
        {
            "id": 8,
            "name": "Lecture 9",
            "date": "2016-09-15T03:30:00.000Z",
            "startTime": "2016-09-15T03:30:00.000Z",
            "endTime": "2016-09-15T03:30:00.000Z",
            "createdAt": "2017-09-04T18:57:44.614Z",
            "updatedAt": "2017-09-04T18:57:44.614Z",
            "batchId": 7,
            "roomId": null
        }
    ]
}
 *
 */
router.get('/', function (req, res) {
  db.actions.lectures.getAll(function (err, lectures) {
    if (err) {
      console.log("ERROR" + err);
      res.status(500).send({
        success: false
        , code: "500"
        , error: {
          message: "Could not get all the lectures(Internal Server Error)."
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
            message: "There are no lectures."
          }
        })
      }
    }
  })
});


/**
 * @api {put} /api/v1/lectures/ PUT /api/v1/lectures/
 * @apiName EditLecture
 * @apiGroup Lecture
 * @apiParam {Object} values updated Lecture object
 * @apiSuccessExample {json} Success-Response:
 *
 * {success:true}
 */
router.put('/',passport.authenticate('bearer'), function (req, res) {
  (function (callback) {
    (req.body.lectures).forEach(function (x) {
      db.actions.lectures.edit(x.id, x, () => {
      })
    })
    callback();
  })(data => res.status(200).send({success: true}));
})

/**
 * @api {get} /api/v1/lectures/:id GET /api/v1/lectures/:id
 * @apiName GetLecturesById
 * @apiGroup Lecture
 * @apiParam {number} id
 * @apiSuccessExample {json} Success-Response:
 *
 * {
    "success": true,
    "data": {
        "id": 7,
        "name": "Lecture 8",
        "date": "2016-09-15T03:30:00.000Z",
        "startTime": "2016-09-15T03:30:00.000Z",
        "endTime": "2016-09-15T03:30:00.000Z",
        "createdAt": "2017-09-04T18:57:10.053Z",
        "updatedAt": "2017-09-04T18:57:10.053Z",
        "batchId": 7,
        "roomId": null
    }
}
 */

router.get('/:id', function (req, res) {
  db.actions.lectures.search(req.params.id, function (err, lecture) {
    if (err) {
      console.log(err);
      res.status(500).send({
        success: false
        , code: "500"
        , error: {
          message: `Could not get the lecture with id ${req.params.id} (Internal Server Error).`
        }
      })
    }
    else {
      if (lecture) {
        res.status(200).send({success: true, data: lecture.get()});
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
 * @api {put} /api/v1/lectures/:id PUT /api/v1/lectures/:id
 * @apiName EditLecture
 * @apiGroup Lecture
 * @apiParam {Object} values updated Lecture object
 * @apiSuccessExample {json} Success-Response:
 *
 * {
    "success": true,
    "data": {
        "id": 7,
        "name": "Lecture 6",
        "date": "2016-09-15T03:30:00.000Z",
        "startTime": "2016-09-15T03:30:00.000Z",
        "endTime": "2016-09-15T03:30:00.000Z",
        "createdAt": "2017-09-04T18:57:10.053Z",
        "updatedAt": "2017-09-04T18:59:34.881Z",
        "batchId": "7",
        "roomId": null
    }
}
 */
router.put('/:id',passport.authenticate('bearer'), function (req, res) {
  db.actions.lectures.edit(req.params.id, req.body.values, function (err, lecture) {
    if (err) {
      console.log(err);
      res.status(500).send({
        success: false
        , code: "500"
        , error: {
          message: `Could not update the lecture with id ${req.params.id} (Internal Server Error).`
        }
      })
    }
    else {
      if (lecture) {
        res.status(201).send({success: true, data: lecture.get()});
      } else {
        res.status(400).send({
          success: false
          , code: "400"
          , error: {
            message: `Could not update the lecture with lecture id(Incorrect details)  ${req.params.id} .`
          }
        })
      }
    }
  })
});

/**
 * @api {delete} /api/v1/lectures/:id DELETE /api/v1/lectures/:id
 * @apiName DeleteLecture
 * @apiGroup Lecture
 * @apiParam {number} id
 * @apiSuccessExample {json} Success-Response:
 *
 * {
    "success": true
}
 */
router.delete('/:id',passport.authenticate('bearer'), function (req, res) {
  db.actions.lectures.deleteLecture(req.params.id, function (err, lectureDeleted) {
    if (err) {
      console.log(err);
      res.status(500).send({
        success: false
        , code: "500"
        , error: {
          message: `Could not delete the lecture with id ${req.params.id} (Internal Server Error).`
        }
      })

    } else {
      if (lectureDeleted !== 0) {
        res.status(200).send({success: true})
      } else {
        res.status(404).send({
          success: false
          , code: "404"
          , error: {
            message: `Could not delete the lecture with id ${req.params.id} (Lecture not found).`
          }
        })
      }
    }
  })
});


module.exports = router;
