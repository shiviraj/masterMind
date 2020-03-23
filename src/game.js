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
    this.isFinished = false;
  }

  get hasStarted() {
    return this.isStarted;
  }

  get hasFinished() {
    return this.isFinished;
  }

  initialDetails(playerId) {
    const details = {};
    details.name = this.players[playerId].name;
    details.players = Object.values(this.players).map(player => {
      return {name: player.name, playerId: player.id};
    });
    return details;
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
    if (code.length !== this.codeDigit) {
      return {error: 'Submit your full code'};
    }
    const {codeResult, remainingChances} = this.code.checkResult(code);
    const isCodeRight = codeResult.every(code => code === 'red');
    this.isFinished = isCodeRight || remainingChances === 0;
    return {code: shuffleCode(codeResult), remainingChances};
  }
  winningStatus() {
    if (this.hasFinished) {
      const game = {};
      game.code = this.code.getCode;
      game.status = 'You win';
      return game;
    }
    return {error: 'game have not finished'};
  }
}

module.exports = Game;
