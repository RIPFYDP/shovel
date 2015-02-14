var express = require('express');

var app = express();
var environment = require('./config/attachments/environment');

environment.init(app);

module.exports = app;
