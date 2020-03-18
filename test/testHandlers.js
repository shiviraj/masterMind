const request = require('supertest');
const {app} = require('../src/router');
const Controller = require('../src/controller');

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

  context('Join Game', () => {
    beforeEach(() => {
      const controller = new Controller();
      controller.addGame(5);
      controller.getGame(1001).addPlayer('Player1');
      app.locals.controller = controller;
    });
    it('Should player join the gameId with valid game id', done => {
      request(app)
        .post('/joinGame')
        .send({username: 'Shivi', gameId: 1001})
        .expect(202, done)
        .expect({gameId: 1001});
    });

    it('Should send 406 error if game id is not valid', done => {
      request(app)
        .post('/joinGame')
        .send({username: 'Shivi', gameId: 10})
        .expect(406, done)
        .expect({error: 'Invalid Game Id'});
    });

    it('Should send 406 error if game already started', done => {
      app.locals.controller.getGame(1001).addPlayer('player2');
      request(app)
        .post('/joinGame')
        .send({username: 'Shivi', gameId: 1001})
        .expect(406, done)
        .expect({error: 'Game already started'});
    });
  });
});
