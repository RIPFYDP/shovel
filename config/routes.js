var express = require('express');
var routes = express.Router();

var applicationController = require('../app/controllers/application_controller');
var controlPanelController = require('../app/controllers/control_panel_controller');
var webpagesController = require('../app/controllers/webpages_controller');

routes.get('/*', applicationController.index);
routes.get('/', controlPanelController.index);
routes.get('/webpages', webpagesController.index);
routes.get('/webpages/new', webpagesController.new);
routes.post('/webpages/create', webpagesController.create);

module.exports = routes;
