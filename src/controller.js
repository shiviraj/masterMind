const Game = require('./game');

class Controller {
  constructor() {
    this.games = {};
    this.lastGameId = 1000;
  }
  addGame(codeDigit) {
    const gameId = ++this.lastGameId;
    this.games[gameId] = new Game(codeDigit, gameId);
    return gameId;
  }
  getGame(gameId) {
    return this.games[gameId];
  }
}

module.exports = Controller;
