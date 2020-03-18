const Code = require('./code');
const Player = require('./player');

class Game {
  constructor(codeDigit) {
    this.codeDigit = codeDigit;
    this.lastPlayerId = 0;
    this.players = {};
  }
  newCode(code) {
    if (code.length === this.codeDigit) {
      this.code = new Code(code);
      return code.length;
    }
    return -1;
  }
  addPlayer(playerName) {
    const playerId = ++this.lastPlayerId;
    const player = new Player(playerName, playerId);
    this.players[playerId] = player;
    return playerId;
  }
}

module.exports = Game;
