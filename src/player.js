class Player {
  constructor(playerName, playerId) {
    this.playerName = playerName;
    this.playerId = playerId;
  }
  get name() {
    return this.playerName;
  }
}

module.exports = Player;
