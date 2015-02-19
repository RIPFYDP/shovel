var cheerio = require('cheerio');
var Q = require('q');
var Entity = require('../models/entity');
var Webpage = require('../models/webpage');

var entitiesController = {
  index: function(req, res, next) {
    Entity.findAllPopulateQ()
    .then(function(entities) {
      res.render('entities/index', {entities: entities});
    }, function(err) {
    });
  },

  new: function(req, res, next) {
    Webpage.findAllQ()
    .then(function(webpages) {
      var options = { webpages: webpages };
      res.render('entities/new', options);
    }, function(err) {
      req.flash('danger', 'We couldn\'t find webpages.');
      return res.redirect('/entities');
    });
  },

  create: function(req, res) {
    Entity.insertOneAndGetValueQ({
      _webpage: req.body.webpage_id,
      selector: req.body.selector
    })
    .then(function(webpage) {
      req.flash('success', 'Saved the entity');
      return res.redirect('/entities');
    }, function(err) {
      req.flash('danger', 'We couldn\'t save the entity');
      return res.redirect('/entities/new');
    });
  },

  destroy: function(req, res) {
    var id = req.body.entity_id;

    Entity.findOneAndRemoveQ({_id: id})
    .then(function(webpage) {
      req.flash('success', 'Deleted the entity');
      return res.redirect('/entities');
    }, function(err) {
      req.flash('danger', 'Sorry, we couldn\'t delete the entity');
      return res.redirect('/entities');
    });
  }
};

module.exports = entitiesController;
