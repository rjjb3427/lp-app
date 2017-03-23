const expect = require('expect');
const request = require('supertest');

require('./../../bin/www');
const app = require('./../../app');
const {users, courses, populateUsers, populateCourses} = require('./../seed/seed');

beforeEach(populateUsers);
beforeEach(populateCourses);

describe('GET /api/courses', () => {
  it('should return authorized user courses', (done) => {
    request(app)
      .get('/api/courses')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2)
      })
      .end(done)
  })
});
