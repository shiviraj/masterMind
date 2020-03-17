const request = require('supertest');
const {app} = require('../src/router');

describe('Handlers', () => {
  context('Static File', () => {
    it('Should serve the static file', done => {
      request(app)
        .get('/game.html')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=UTF-8', done);
    });
  });
});
