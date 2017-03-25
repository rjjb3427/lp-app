require('./../bin/config/config');

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();

const {mongoose} = require('./../db/mongoose');
const {Course} = require('./../models/course');
const {authenticate} = require('./../middlewares/authenticate');

const DIR = 'src/assets/images';

// Multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}-${req.user.username}-${Date.now()}.jpg`)
  }
});

const upload = multer({storage: storage});

router.route('/')
  .all(authenticate, (req, res, next) => {
    next();
  })
  .post(upload.single('file'), (req, res) => {
    console.log(req.file)
    res.status(200).send(req.file);
  });

module.exports = router;
