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

const joinGame = function(req, res) {
  const {gameId, username} = req.body;
  const game = req.app.locals.controller.getGame(gameId);
  if (!game) {
    return res.status(406).json({error: 'Invalid Game Id'});
  }
  if (game.hasStarted) {
    return res.status(406).json({error: 'Game already started'});
  }
  const playerId = game.addPlayer(username);
  res.cookie('_gameId', `${gameId}`).cookie('_playerId', `${playerId}`);
  res.status(202).json({gameId});
};

module.exports = {hasFields, hostGame, joinGame};
