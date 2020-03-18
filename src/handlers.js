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
    return res.status(406).json({error: `Invalid Game Id(${gameId})`});
  }
  if (game.hasStarted) {
    return res.status(406).json({error: 'Game already started'});
  }
  const playerId = game.addPlayer(username);
  res.cookie('_gameId', `${gameId}`).cookie('_playerId', `${playerId}`);
  res.status(202).json({gameId});
};

const attackGame = function(req, res, next) {
  const {_gameId} = req.cookies;
  const game = res.app.locals.controller.getGame(_gameId);
  if (game) {
    req.game = game;
    return next();
  }
  res.status(404).send('Bad request');
};

const serveWaitingStatus = function(req, res) {
  const status = req.game.waitingStatus();
  res.status(202).json(status);
};

module.exports = {
  hasFields,
  hostGame,
  joinGame,
  attackGame,
  serveWaitingStatus
};
