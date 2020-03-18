const {assert} = require('chai');
const Controller = require('../src/controller');

describe('Controller', () => {
  context('addGame', () => {
    it('Should add new game', () => {
      const controller = new Controller();
      assert.strictEqual(controller.addGame(5), 1001);
    });
  });
});
