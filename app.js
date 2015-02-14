var express = require('express');

var app = express();
var environment = require('./config/attachments/environment');
var mongoConnector = require('./config/attachments/mongoose_connector');

environment.init(app);
mongoConnector.init(app);

module.exports = app;
