var cheerio = require('cheerio');
var Q = require('q');
var Request = require('../models/request');
var Webpage = require('../models/webpage');

var webpagesController = {
  index: function(req, res, next) {
    Webpage.findAll()
    .then(function(webpages) {
      res.render('webpages/index', { webpages: webpages });
    }, function(err) {

    });
  },

  new: function(req, res, next) {
    res.render('webpages/new');
  },

  create: function(req, res) {
    var url = req.body.url;
    var request = new Request();
    var webpage;

    request.get(url)
    .then(function(body) {
      return body;

      // $ = cheerio.load(body);
      // console.log($('#block-block-1').text());
    }, function(err) {
      // TODO: handle err
    })
    .then(function(body) {
      webpage = new Webpage();

      return webpage.insert({
        body: body,
        url: url
      });
    }, function(err) {
      // TODO: handle err
    })
    .then(function(webpage) {
      req.flash('success', 'Added a new webpage.');
      return res.redirect('/webpages');
    }, function(err) {
    });
  }
};

module.exports = webpagesController;
