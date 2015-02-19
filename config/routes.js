var express = require('express');
var routes = express.Router();

var applicationController = require('../app/controllers/application_controller');
var controlPanelController = require('../app/controllers/control_panel_controller');
var webpagesController = require('../app/controllers/webpages_controller');
var entitiesController = require('../app/controllers/entities_controller');

routes.get('/*', applicationController.index);

routes.get('/', controlPanelController.index);

routes.get('/webpages', webpagesController.index);
routes.get('/webpages/new', webpagesController.new);
routes.get('/webpages/:id/edit', webpagesController.edit);
routes.post('/webpages/create', webpagesController.create);
routes.post('/webpages/update', webpagesController.update);
routes.post('/webpages/destroy', webpagesController.destroy);

routes.get('/entities', entitiesController.index);
routes.get('/entities/new', entitiesController.new);
routes.get('/entities/:id/edit', entitiesController.edit);
routes.post('/entities/create', entitiesController.create);
routes.post('/entities/destroy', entitiesController.destroy);

module.exports = routes;
