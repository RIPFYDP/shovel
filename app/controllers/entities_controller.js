var cheerio = require('cheerio');
var Q = require('q');
var Entity = require('../models/entity');
var Website = require('../models/website');

var entitiesController = {
  index: function(req, res, next) {
  },

  new: function(req, res, next) {
    var options = {};

    res.render('entities/new', options);
  }
};

module.exports = entitiesController;
