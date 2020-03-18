const {assert} = require('chai');
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
});
