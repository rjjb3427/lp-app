require('./../bin/config/config');

const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {mongoose} = require('./../db/mongoose');
const {User} = require('./../models/user');
const {authenticate} = require('./../middlewares/authenticate');

/* GET users. */
router.route('/register')
  .post((req, res) => {
    let body = _.pick(req.body, ['username', 'firstName', 'lastName', 'email', 'password']);
    let user = new User(body);

    user.save().then(() => {
      return user.generateAuthToken()
    }).then((token) => {
      res.header({
        'x-auth': token,
        'Access-Control-Expose-Headers': 'x-auth'
      }).send(user)
    }).catch((e) => {
      res.status(400).send(e)
    })
  });

router.route('/profile')
  .get(authenticate, (req, res) => {
    res.send(req.user)
  });


router.route('/login')
  .post((req, res) => {
    let body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password)
      .then((user) => {
        return user.generateAuthToken().then((token) => {
          res.header({
            'x-auth': token,
            'Access-Control-Expose-Headers': 'x-auth'
          }).send(user)
        })
      }).catch((e) => {
      res.status(400).send({error: 'User not found', e})
    })
  });

router.route('/logout')
  .delete(authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send('user logged out')
    }, () => {
      res.status(400).send()
    })
  });

module.exports = router;
