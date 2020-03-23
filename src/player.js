class Player {
  constructor(playerName, playerId) {
    this.playerName = playerName;
    this.playerId = playerId;
  }
  get name() {
    return this.playerName;
  }
  get id() {
    return this.playerId;
  }
}

module.exports = Player;
