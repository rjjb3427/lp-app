const {ObjectID} = require('mongodb');
const {faker} = require('faker');

const {Course} = require('./../../models/course');
const {User} = require('./../../models/user');


//Seed users data
const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    username: 'mohi86',
    firstName: 'Mohi',
    lastName: 'Khalili',
    email: 'mohi@live.com',
    password: 'abcd1234'
  },
  {
    _id: userTwoId,
    username: 'mary21',
    firstName: 'Mary',
    lastName: 'Siah',
    email: 'mary@live.com',
    password: 'abcd12345'
  }
];

//Seed Courses data
const courses = [];

const seedCourses = (items) => {
  for(let i = i; i < items; i++) {
    let course = {
      title: 'courses name',
      categories: faker.Random.bs_noun(),
      platform: faker.Random.bs_noun(),
      author: faker.Name.findName(),
      _userId: userOneId,
      thumbnailURL: faker.Image.imageUrl()
    }
  }
};

const populateCourses = (done) => {
  Course.remove({}).then(() => {
    seedCourses(5);
    return Course.insertMany(courses)
  }).then(() => done())
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let user1 = new User(users[0]).save();
    let user2 = new User(users[1]).save();

    return Promise.all([user1, user2])
  }).then(() => done())
};
