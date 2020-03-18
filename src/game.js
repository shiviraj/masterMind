const Code = require('./code');
const Player = require('./player');

const shuffleCode = function(code) {
  for (let shuffleTime = 0; shuffleTime < 8; shuffleTime++) {
    code.sort((a, b) => Math.random() - 0.5);
  }
  return code;
};

class Game {
  constructor(codeDigit, gameId) {
    this.codeDigit = codeDigit;
    this.lastPlayerId = 0;
    this.gameId = gameId;
    this.players = {};
    this.isStarted = false;
  }

  get hasStarted() {
    return this.isStarted;
  }

  newCode(code, totalChances) {
    if (code.length === this.codeDigit) {
      this.code = new Code(code, totalChances);
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
  waitingStatus() {
    const status = {};
    status.isStarted = this.isStarted;
    status.gameId = this.gameId;
    status.playerNames = Object.values(this.players).map(player => player.name);
    return status;
  }

  submitCode(code) {
    if (code.length === this.codeDigit) {
      const {codeResult, remainingChances} = this.code.checkResult(code);
      return {code: shuffleCode(codeResult), remainingChances};
    }
    return {error: 'Submit your full code'};
  }
}

module.exports = Game;
