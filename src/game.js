const Code = require('./code');
const Player = require('./player');

class Game {
  constructor(codeDigit) {
    this.codeDigit = codeDigit;
    this.lastPlayerId = 0;
    this.players = {};
    this.isStarted = false;
  }

  get hasStarted() {
    return this.isStarted;
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
    this.isStarted = this.lastPlayerId === 2;
    return playerId;
  }
}

module.exports = Game;
