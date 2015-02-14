var request = require('request');
var cheerio = require('cheerio');

var webpagesController = {
  index: function(req, res, next) {
    res.render('webpages/index');
  },

  new: function(req, res, next) {
    res.render('webpages/new');
  },

  create: function(req, res) {
    var url = req.body.url;

    // Use http://www.medicine.utoronto.ca/ for now
    // TODO: need to validate url
    request(url, function(err, response, body) {
      if (!err && response.statusCode === 200) {
        $ = cheerio.load(body);

        // TODO: dynamic selector
        console.log($('#block-block-1').text());
      }
    });
  }
};

module.exports = webpagesController;
