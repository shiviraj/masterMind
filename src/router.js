const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.json({limit: '100kb'}));

module.exports = {app};
