const mongoose = require("mongoose");
const mongodb = require("mongodb");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 8
  },
  tokens: [{
    access: {
      type:String,
      required:true
    },
    token: {
      type: String,
      required: true
    }
  }],
  learningPaths: [{
    title:{
      type: String,
      trim: true
    },
    description:{
      type: String,
      trim: true
    },
    coursesInPath:[{
      courseId : mongoose.Schema.Types.ObjectId
    }]
  }],
  currentCourseId: {
    type: mongoose.Schema.Types.ObjectId
  },
  completedCourses: [{
    courseId : mongoose.Schema.Types.ObjectId
  }]
});

UserSchema.pre('save', function (next) {
  let user = this;

  if (user.isModified('password')) {

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next()
      })
    })
  } else {
    next()
  }
});

UserSchema.statics.findByCredentials = function (email, password) {
  let User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reset()
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user)
        } else {
          reject()
        }
      })
    })
  })
};

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id','username', 'firstName', 'lastName', 'email'])
};

UserSchema.methods.generateAuthToken = function () {
  let user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access }, 'abc123').toString();

  user.tokens.push({
    access, token
  });
  return user.save().then(() => {
    return token
  })
};

UserSchema.methods.removeToken = function (token) {
  let user = this;
  return user.update({
    $pull: {
      tokens:{
        token: token
      }
    }
  })
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'abc123')
  } catch (e){
    return Promise.reject()
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
};
//TODO complete user update
// UserSchema.methods.save = function () {
//   const User = this;
//
//
// };

const User = mongoose.model('User', UserSchema);

module.exports = {User};
