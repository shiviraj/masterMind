const {assert} = require('chai');
const Code = require('../src/code');

describe('Code', () => {
  context('CheckResults', () => {
    it('Should give the result and remaining chance of code', () => {
      const code = new Code(['red', 'yellow'], 3);
      assert.deepStrictEqual(code.checkResult(['red', 'white', 'yellow']), {
        codeResult: ['red', '', 'white'],
        remainingChances: 2
      });
    });
  });

  context('getCode', () => {
    it('Should give original code', () => {
      const code = new Code(['red', 'yellow'], 3);
      assert.deepStrictEqual(code.getCode, ['red', 'yellow']);
    });
  });
});
