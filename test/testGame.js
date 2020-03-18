const {assert} = require('chai');
const sinon = require('sinon');
const Game = require('../src/game');

describe('Game', () => {
  it('Should store a new code', () => {
    const game = new Game(1);
    assert.instanceOf(game, Game);
  });
  context('New Code', () => {
    it('Should add new code in game', () => {
      const game = new Game(1);
      assert.strictEqual(game.newCode(['red']), 1);
    });
    it('Should not add new code in game if code is invalid', () => {
      const game = new Game(2);
      assert.strictEqual(game.newCode(['red']), -1);
    });
  });

  context('add Player', () => {
    it('Should add new player in game', () => {
      const game = new Game(1);
      assert.strictEqual(game.addPlayer('player1'), 1);
    });
  });

  context('hasStarted', () => {
    it('Should return true if game is started', () => {
      const game = new Game(1);
      game.addPlayer('player1');
      game.addPlayer('player2');
      assert.isTrue(game.hasStarted);
    });
    it('Should return false if game is not started', () => {
      const game = new Game(1);
      game.addPlayer('player1');
      assert.isFalse(game.hasStarted);
    });
  });

  context('waitingStatus', () => {
    it('Should return waiting status of game', () => {
      const game = new Game(1, 1001);
      game.addPlayer('player1');
      assert.deepStrictEqual(game.waitingStatus(), {
        isStarted: false,
        gameId: 1001,
        playerNames: ['player1']
      });
    });
  });

  context('submitCode', () => {
    it('Should result and remaining chances after submission of code', () => {
      sinon.replace(Math, 'random', sinon.fake.returns(0.2));
      const game = new Game(2, 1001);
      game.addPlayer('player1');
      game.newCode(['red', 'yellow'], 3);
      assert.deepStrictEqual(game.submitCode(['red', 'green']), {
        code: ['red', ''],
        remainingChances: 2
      });
      sinon.restore();
    });

    it('Should give error if code is not equal to codeDigit', () => {
      const game = new Game(1, 1001);
      game.addPlayer('player1');
      game.newCode(['red'], 3);
      assert.deepStrictEqual(game.submitCode(['red', 'green']), {
        error: 'Submit your full code'
      });
    });
  });
});
