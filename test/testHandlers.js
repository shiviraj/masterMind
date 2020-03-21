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
        .expect({error: 'Invalid Game Id(10)'});
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

  context('Waiting Status', () => {
    beforeEach(() => {
      const controller = new Controller();
      controller.addGame(5);
      controller.getGame(1001).addPlayer('Player1');
      app.locals.controller = controller;
    });
    it('Should get the waiting status of this game', done => {
      request(app)
        .get('/waitingStatus')
        .set('Cookie', '_gameId=1001;_playerId=1')
        .expect(202, done)
        .expect({gameId: 1001, isStarted: false, playerNames: ['Player1']});
    });

    it('Should send 404 error if there is no cookie', done => {
      request(app)
        .get('/waitingStatus')
        .expect(404, done);
    });
  });

  context('submitCode', () => {
    beforeEach(() => {
      const controller = new Controller();
      controller.addGame(2);
      controller.getGame(1001).addPlayer('Player1');
      controller.getGame(1001).newCode(['red', 'yellow'], 3);
      app.locals.controller = controller;
    });
    it('Should get the waiting status of this game', done => {
      request(app)
        .post('/submitCode')
        .send({code: ['red', 'yellow']})
        .set('Cookie', '_gameId=1001;_playerId=1')
        .expect(202, done)
        .expect({code: ['red', 'red'], remainingChances: 2});
    });

    it('Should send 404 error if there is no code', done => {
      request(app)
        .post('/submitCode')
        .expect(404, done);
    });
  });

  context('winningStatus', () => {
    beforeEach(() => {
      const controller = new Controller();
      controller.addGame(2);
      controller.getGame(1001).addPlayer('Player1');
      controller.getGame(1001).newCode(['red', 'yellow'], 3);
      app.locals.controller = controller;
    });

    it('Should give 406 of the game result if game has not finished', done => {
      request(app)
        .get('/gameResult')
        .set('Cookie', '_gameId=1001;_playerId=1')
        .expect(406, done)
        .expect({error: 'game have not finished'});
    });

    it('Should give game result of the game', done => {
      app.locals.controller.getGame(1001).submitCode(['red', 'yellow']);
      request(app)
        .get('/gameResult')
        .set('Cookie', '_gameId=1001;_playerId=1')
        .expect(202, done)
        .expect({code: ['red', 'yellow'], status: 'You win'});
    });
  });
});
