const {assert} = require('chai');
const Player = require('../src/player');

describe('Player', () => {
  context('name', () => {
    it('Should return player Name', () => {
      const player = new Player('player1', 1);
      assert.strictEqual(player.name, 'player1');
    });
  });
});
