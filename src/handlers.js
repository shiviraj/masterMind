const hasFields = function(...fields) {
  return function(req, res, next) {
    if (fields.every(item => item in req.body)) {
      return next();
    }
    res.status(404).send('Bad request');
  };
};

const randomCode = function(digit) {
  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'brown',
    'magenta'
  ];
  const code = [];
  for (let codeDigit = 0; codeDigit < digit; codeDigit++) {
    code.push(colors[Math.floor(Math.random() * colors.length)]);
  }
  return code;
};

const hostGame = function(req, res) {
  const gameId = req.app.locals.controller.addGame(5);
  const game = req.app.locals.controller.getGame(gameId);
  const playerId = game.addPlayer(req.body.username);
  game.newCode(randomCode(5), 12);
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

const serveCodeResult = function(req, res) {
  const result = req.game.submitCode(req.body.code);
  res.status(202).json(result);
};

const serveGameResult = function(req, res) {
  const gameStatus = req.game.winningStatus();
  res.status(202);
  if (gameStatus.error) {
    res.status(406);
  }
  res.json(gameStatus);
};

module.exports = {
  hasFields,
  hostGame,
  joinGame,
  attackGame,
  serveWaitingStatus,
  serveCodeResult,
  serveGameResult
};
