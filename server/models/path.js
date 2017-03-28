const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const _ = require('lodash');

const PathSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: null
  },
  categories: [{
    type: String,
    trim: true,
    default: null
  }],
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  _courses: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  }],
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

PathSchema.statics.findAllAndPaginate = function (req) {
  const Path = this;
  let options = {
    page: Number.isInteger(parseInt(req.query.page)) ? parseInt(req.query.page) : 1,
    limit: Number.isInteger(parseInt(req.query.limit)) ? parseInt(req.query.limit) : 100
  };

  return Path.paginate({_userId: req.user._id}, options);
};

PathSchema.statics.save = function (req) {
  const Path = this;

  let path = new Path({
    title: req.body.title,
    description: req.body.description,
    categories: req.body.categories,
    _userId: req.user._id
  });

  return path.save();
};

PathSchema.statics.findPathAndUpdate = function (req) {
  const Path = this;
  const id = req.params.id;

  let body = _.pick(req.body, [
    'title',
    'categories',
    'description'
  ]);

  return Path.findOneAndUpdate({
    _userId: req.user._id,
    _id: id
  }, {
    $set: body
  }, {
    new: true
  })
};

PathSchema.statics.findPathAndUpdateCourses = function (req) {
  const Path = this;
  const pathId = req.body.pathId;
  const id = req.body.courseId;
  const title = req.body.courseTitle;

  return Path.findOne({
    _userId: req.user._id,
    _id: pathId
  })
    .then((path) => {
      if (_.filter(path._courses, x => x.id.equals(id)).length === 0) {
        path._courses.push({
          id, title
        });

        return path.save().then(() => {
          return path;
        })
      }
      return {error: 'Course already exists'};
    })
    .catch((e) => {
      return e;
    });
};

PathSchema.statics.findPathAndDeleteCourses = function (req) {
  const Path = this;
  const pathId = req.body.pathId;
  const id = req.body.courseId;
  const title = req.body.courseTitle;

  return Path.findOne({
    _userId: req.user._id,
    _id: pathId
  })
    .then((path) => {
      if (_.filter(path._courses, x => x.id.equals(id)).length === 0) {
        path._courses.splice({
          id, title
        });

        return path.save().then(() => {
          return path;
        })
      }
      return {error: 'Course already removed'};
    })
    .catch((e) => {
      return e;
    });
};

PathSchema.statics.findPathAndDelete = function (req) {
  const Path = this;
  const id = req.params.id;

  return Path.findOneAndRemove({"_userId": req.user._id, "_id": id})
};

PathSchema.plugin(mongoosePaginate);

const Path = mongoose.model('Path', PathSchema);

module.exports = {Path};
