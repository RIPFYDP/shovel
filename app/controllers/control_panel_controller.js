var Q = require('q');
var Webpage = require('../models/webpage');
var Entity = require('../models/entity');

var controlPanelController = {
  index: function(req, res, next) {
    var data = {};

    Webpage.findAllQ()
    .then(function(webpages) {
      data.webpages = webpages;
      return Entity.findAllQ();
    }, function(err) {
      req.flash('danger', 'Webpages didn\'t load. Check if mongodb is up.');
      return res.redirect('/');
    })
    .then(function(entities) {
      data.entities = entities;
      res.render('control_panel/index', data);
    }, function(err) {
      req.flash('danger', 'Entities didn\'t load.');
      return res.redirect('/');
    });
  }
};

module.exports = controlPanelController;
