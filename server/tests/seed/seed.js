const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Course} = require('./../../models/course');
const {User} = require('./../../models/user');

//Seed users data
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const courseOneId = new ObjectID();
const courseTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    username: 'mohi86',
    firstName: 'Mohi',
    lastName: 'Khalili',
    email: 'mohi@live.com',
    password: 'abcd1234',
    tokens:[{
      access: 'auth',
      token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
  },
  {
    _id: userTwoId,
    username: 'mary21',
    firstName: 'Mary',
    lastName: 'Siah',
    email: 'mary@live.com',
    password: 'abcd12345',
    tokens:[{
      access: 'auth',
      token: jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString()
    }]
  }
];

//Seed Courses data
const courses = [
  {
    _id: courseOneId,
    title: 'sample name',
    categories: ['js'],
    platform: 'Udemy',
    author: 'Mohi Khalili',
    _userId: userOneId,
    thumbnailURL: 'someurl'
  },
  {
    _id: courseTwoId,
    title: 'sample name 2',
    categories: ['node'],
    platform: 'lynda',
    author: 'mohi khalili',
    _userId: userOneId,
    thumbnailURL: ''
  }
];

const populateCourses = (done) => {
  Course.remove({}).then(() => {
    let course1 = new Course(courses[0]).save();

    let course2 = new Course(courses[1]).save();

    return Promise.all([course1, course2])
  }).then(() => done())
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let user1 = new User(users[0]).save();
    let user2 = new User(users[1]).save();

    return Promise.all([user1, user2])
  }).then(() => done())
};

module.exports= {courses, populateCourses, users, populateUsers};
