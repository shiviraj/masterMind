const {assert} = require('chai');
const Controller = require('../src/controller');
const Game = require('../src/game');

describe('Controller', () => {
  context('addGame', () => {
    it('Should add new game', () => {
      const controller = new Controller();
      assert.strictEqual(controller.addGame(5), 1001);
    });
  });
  context('getGame', () => {
    it('Should return existing game by gameId', () => {
      const controller = new Controller();
      controller.addGame(5);
      assert.instanceOf(controller.getGame(1001), Game);
    });
  });
});
