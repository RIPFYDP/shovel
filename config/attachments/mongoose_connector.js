var Q = require('q');
var Mongoose = require('./mongoose');

var mongooseConnector = {
  init: function() {
    var deferred = Q.defer();
    var mongoose = new Mongoose();

    mongoose.connect()
    .then(function(db) {
      environment.current.db = db;
    }, function(err) {
      throw err;
    });
  }
};

module.exports = mongooseConnector;
