const Code = require('./code');

class Game {
  constructor(codeDigit) {
    this.codeDigit = codeDigit;
  }
  newCode(code) {
    if (code.length === this.codeDigit) {
      this.code = new Code(code);
      return code.length;
    }
    return -1;
  }
}

module.exports = Game;
