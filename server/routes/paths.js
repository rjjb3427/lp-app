require('./../bin/config/config');

const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../db/mongoose');
const {Path} = require('./../models/path');
const {authenticate} = require('./../middlewares/authenticate');

router.route('/')
  .all(authenticate, (req, res, next) => {
    next();
  })
  .get((req, res) => {

    Path.findAllAndPaginate(req)
      .then((result) => {
        res.send(result.docs)
      }, (e) => {
        res.status(400).send(e)
      });
  })
  .post((req, res) => {
    Path.save(req).then((path) => {
      res.status(200).send(path)
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

    Path.findOne({_userId: req.user._id, _id: id})
      .then((path) => {
        if (!path) {
          return res.status(404).send('Path not found')
        }
        res.status(200).send(path)
      })
      .catch((e) => {
        res.status(400).send(e)
      })
  })
  .patch((req, res) => {

    Path.findPathAndUpdate(req)
      .then((path) => {
        if (!path) {
          return res.status(404).send()
        }
        res.send(path)
      })
      .catch((e) => {
        return res.status(400).send(e)
      })
  })
  .delete((req, res) => {
    Path.findPathAndDelete(req)
      .then((path) => {
        if (!path) {
          return res.status(404).send()
        }
        res.send(path)
      })
      .catch((e) => {
        res.status(400).send(e)
      })
  });

module.exports = router;
