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
      req.flash('success', 'Saved the entity.');
      return res.redirect('/entities');
    }, function(err) {
      req.flash('danger', 'We couldn\'t save the entity');
      return res.redirect('/entities/new');
    });
  },

  edit: function(req, res) {
    var data = {};

    Webpage.findAllQ()
    .then(function(webpages) {
      data.webpages = webpages;
      return Entity.findOnePopulateQ({ _id: req.params.id });
    }, function(err) {
      req.flash('danger', 'We couldn\'t find webpages.');
      return res.redirect('/entities');
    })
    .then(function(entity) {
      data.entity = entity;
      return res.render('entities/edit', data);
    }, function(err) {
      req.flash('danger', 'Sorry, we couldn\'t find the entity.');
      return res.redirect('/entities');
    });
  },

  update: function(req, res) {
    var data = {
      selector: req.body.selector,
      'webpage_id': req.body.webpage_id
    };

    Entity.findOneAndUpdateWithValueQ({ _id: req.params.id }, data)
    .then(function(entity) {
      res.redirect('/entities');
    }, function(err) {
      req.flash('danger', 'We couldn\'t find the entity');
      res.redirect('/entities/' + req.params.id + '/edit');
    });
  },

  destroy: function(req, res) {
    var id = req.body.entity_id;

    Entity.findOneAndRemoveDepopulateQ({_id: id})
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
