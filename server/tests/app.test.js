const expect = require('expect');
const request = require('supertest');

require('./../bin/www');
const app = require('./../app');
const {populateUsers, populateCourses} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateCourses);

describe('GET /', () => {
  it('should all non-API routes and redirect to index.html', (done) => {
    request(app)
      .get('/randomurl')
      .expect(200)
      .end(done)
  })
});
