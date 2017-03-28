require('./../bin/config/config');

const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../db/mongoose');
const {Course} = require('./../models/course');
const {Path} = require('./../models/path');
const {authenticate} = require('./../middlewares/authenticate');

router.route('/')
  .all(authenticate, (req, res, next) => {
    next();
  })
  .get((req, res) => {

    Course.findAllAndPaginate(req)
      .then((result) => {
        res.send(result.docs)
      }, (e) => {
        res.status(400).send(e)
      });
  })
  .post((req, res) => {
    Course.save(req).then((course) => {
      console.log(course)
      res.status(200).send(course)
    }, (e) => {
      res.status(400).send(e)
    });
  });

router.route('/:id')
  .all(authenticate, (req, res, next) => {
    next();
  })
  .get((req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(400).send('Invalid ID')
    }

    Course.findOne({_userId: req.user._id, _id: id})
      .then((course) => {
        if (!course) {
          return res.status(404).send('Course not found')
        }
        res.status(200).send(course)
      })
      .catch((e) => {
        res.status(400).send(e)
      })
  })
  .patch((req, res) => {

    Course.findCourseAndUpdate(req)
      .then((course) => {
        if (!course) {
          return res.status(404).send()
        }
        res.send(course)
      })
      .catch((e) => {
        return res.status(400).send(e)
      })
  })
  .delete((req, res) => {
    Course.findCourseAndDelete(req)
      .then((course) => {
        if (!course) {
          return res.status(404).send()
        }
        res.send(course)
      })
      .catch((e) => {
        res.status(400).send(e)
      })
  });

router.route('/:id/paths')
  .all(authenticate, (req, res, next) => {
    next();
  })
  .patch((req, res) => {
    Course.findCourseAndUpdatePaths(req)
      .then((course) => {
        if (!course) {
          return res.status(404).send()
        }
        Path.findPathAndUpdateCourses(req)
          .then((path) => {
            if(!path){
              return res.status(404).send()
            }
            return res.send()
          })
      })
      .catch((e) => {
        return res.status(400).send(e)
      })
  });

module.exports = router;
