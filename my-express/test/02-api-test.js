const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('returns 200', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
