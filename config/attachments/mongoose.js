var mongoose = require('mongoose');
var Q = require('q');

var environment = require('./environment');
var Mongoose = function() {};

Mongoose.prototype.connect = function() {
  var deferred = Q.defer();
  var url = environment.current.database.fullUrl;

  mongoose.connect(url, function(err) {
    if (err) {
      deferred.reject(err);
    }

    deferred.resolve(mongoose);
  });

  return deferred.promise;
};

module.exports = Mongoose;
