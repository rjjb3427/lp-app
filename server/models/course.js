const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const _ = require('lodash');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  categories: [{
    type: String,
    trim: true,
    default: null
  }],
  platform: {
    type: String,
    trim: true,
    default: null
  },
  link: {
    type: String,
    trim: true,
    default: null
  },
  author: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  thumbnailURL: {
    type: String,
    trim: true,
    default: null
  },
  publishedDate: {
    type: Number,
    default: null
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

CourseSchema.statics.findAllAndPaginate = function (req) {
  const Course = this;
  let options = {
    page: Number.isInteger(parseInt(req.query.page)) ? parseInt(req.query.page) : 1,
    limit: Number.isInteger(parseInt(req.query.limit)) ? parseInt(req.query.limit) : 100
  };

  return Course.paginate({_userId: req.user._id}, options);
};

CourseSchema.statics.save = function (req) {
  const Course = this;

  let course = new Course({
    title: req.body.title,
    categories: req.body.categories,
    platform: req.body.platform,
    link: req.body.link,
    author: req.body.author,
    _userId: req.user._id,
    thumbnailURL: req.body.thumbUrl
  });

  return course.save();
};

CourseSchema.statics.findCourseAndUpdate = function (req) {
  const Course = this;
  const id = req.params.id;

  let body = _.pick(req.body, [
    'title',
    'categories',
    'platform',
    'link',
    'author',
    'thunmbUrl'
  ]);

  return Course.findOneAndUpdate({
    _userId: req.user._id,
    _id: id
  }, {
    $set: body
  }, {
    new: true
  })
};

CourseSchema.statics.findCourseAndDelete = function (req) {
  const Course = this;
  const id = req.params.id;

  return Course.findOneAndRemove({"_userId": req.user._id, "_id": id})
};

CourseSchema.plugin(mongoosePaginate);

const Course = mongoose.model('Course', CourseSchema);

module.exports = {Course};
