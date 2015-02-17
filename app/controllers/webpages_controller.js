var Q = require('q');
var S = require('string');
var Request = require('../models/request');
var Webpage = require('../models/webpage');

var webpagesController = {
  index: function(req, res, next) {
    Webpage.findAllQ()
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
  },

  edit: function(req, res, next) {
    var id = req.params.id;

    Webpage.findOneQ({_id: id})
    .then(function(webpage) {
      return res.render('webpages/edit', {webpage: webpage});
    }, function(err) {
      req.flash('danger', 'Sorry, we couldn\'t find the webpage.');
      return res.redirect('/webpages');
    });
  },

  update: function(req, res) {
    var request = new Request();

    request.get(req.body.url)
    .then(function(body) {
      return body;
    }, function(err) {
      // TODO: handle err
    })
    .then(function(body) {
      var data = {
        url: req.body.url,
        body: body
      };

      return Webpage.findOneAndUpdateQ({ _id: req.body.id }, data);
    }, function(err) {
      // TODO: handle err
    })
    .then(function(webpage) {
      req.flash('success', 'Updated the webpage.');
      return res.redirect('/webpages');
    }, function(err) {
      req.flash('danger', 'Sorry, we could\'t update the webpage.');
      return res.redirect('/webpages/' + req.body.id + '/edit');
    });


  },

  destroy: function(req, res) {
    var id = req.body.webpage_id;

    Webpage.findOneAndRemoveQ({_id: id})
    .then(function(webpage) {
      req.flash('success', 'Deleted the webpage');
      return res.redirect('/webpages');
    }, function(err) {
      req.flash('danger', 'Sorry, we couldn\'t delete the webpage');
      return res.redirect('/webpages');
    });
  }
};

module.exports = webpagesController;
