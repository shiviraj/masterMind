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

  context('Host Game', () => {
    it('Should send back the gameId', done => {
      request(app)
        .post('/hostGame')
        .send({username: 'Shivi'})
        .expect(202, done)
        .expect({gameId: 1001});
    });

    it('Should send 404 error if username not provided', done => {
      request(app)
        .post('/hostGame')
        .expect(404, done)
        .expect('Bad request');
    });
  });
});
