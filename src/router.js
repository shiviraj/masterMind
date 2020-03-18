const express = require('express');
const Controller = require('./controller');
const {hasFields, hostGame} = require('./handlers');

const app = express();
app.locals.controller = new Controller();

app.use(express.static('public'));
app.use(express.json({limit: '100kb'}));
app.post('/hostGame', hasFields('username'), hostGame);

module.exports = {app};
