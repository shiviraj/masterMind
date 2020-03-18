const express = require('express');
const cookieParser = require('cookie-parser');
const Controller = require('./controller');
const {
  hasFields,
  hostGame,
  joinGame,
  attackGame,
  serveWaitingStatus,
  serveCodeResult
} = require('./handlers');

const app = express();
app.locals.controller = new Controller();

app.use(express.static('public'));
app.use(express.json({limit: '100kb'}));
app.use(cookieParser());
app.post('/hostGame', hasFields('username'), hostGame);
app.post('/joinGame', hasFields('username', 'gameId'), joinGame);
app.use(attackGame);
app.get('/waitingStatus', serveWaitingStatus);
app.post('/submitCode', hasFields('code'), serveCodeResult);

module.exports = {app};
