var cheerio = require('cheerio');
var Q = require('q');
var Entity = require('../models/entity');
var Webpage = require('../models/webpage');

var entitiesController = {
  index: function(req, res, next) {
  },

  new: function(req, res, next) {
    var options = {};

    Webpage.findAllQ()
    .then(function(webpages) {
      options.webpages = webpages;
      res.render('entities/new', options);
    }, function(err) {
      req.flash('danger', 'We couldn\'t find webpages.');
      return res.redirect('/entities');
    });
  }
};

module.exports = entitiesController;
