const Game = require('./game');

class Controller {
  constructor() {
    this.games = {};
    this.lastGameId = 1000;
  }
  addGame(codeDigit) {
    const game = new Game(codeDigit);
    this.games[++this.lastGameId] = game;
    return this.lastGameId;
  }
}

module.exports = Controller;
