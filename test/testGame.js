const {assert} = require('chai');
const Game = require('../src/game');

describe('Game', () => {
  it('Should store a new code', () => {
    const game = new Game(1);
    assert.instanceOf(game, Game);
  });

  context('newCode', () => {
    it('Should store a new code', () => {
      const game = new Game(1);
      assert.strictEqual(game.newCode(['red']), 1);
    });

    it('Should not store if code is not equal to code length', () => {
      const game = new Game(2);
      assert.strictEqual(game.newCode(['red']), -1);
    });
  });
});
