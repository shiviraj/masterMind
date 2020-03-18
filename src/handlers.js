const hasFields = function(...fields) {
  return function(req, res, next) {
    if (fields.every(item => item in req.body)) {
      return next();
    }
    res.status(404).send('Bad request');
  };
};

const hostGame = function(req, res) {
  const gameId = req.app.locals.controller.addGame(5);
  const game = req.app.locals.controller.getGame(gameId);
  const playerId = game.addPlayer(req.body.username);
  res.cookie('_gameId', `${gameId}`).cookie('_playerId', `${playerId}`);
  res.status(202).json({gameId});
};

module.exports = {hasFields, hostGame};
