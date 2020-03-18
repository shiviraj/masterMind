const express = require('express');
const Controller = require('./controller');
const {hasFields, hostGame, joinGame} = require('./handlers');

const app = express();
app.locals.controller = new Controller();

app.use(express.static('public'));
app.use(express.json({limit: '100kb'}));
app.post('/hostGame', hasFields('username'), hostGame);
app.post('/joinGame', hasFields('username', 'gameId'), joinGame);

module.exports = {app};
