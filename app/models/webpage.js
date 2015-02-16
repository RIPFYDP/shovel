var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

var webpageSchema = new Schema({
  date: { type: Date, default: Date.now },
  url: String,
  body: String
});

var Webpage = mongoose.model('Webpage', webpageSchema);

Webpage.findAll = function() {
  var deferred = Q.defer();

  Webpage.find({}, function(err, result) {
    if(err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

Webpage.findOneQ = function(data) {
  var deferred = Q.defer();

  Webpage.findOne(data, function(err, result) {
    if (err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

Webpage.findOneAndRemoveQ = function(data) {
  var deferred = Q.defer();

  Webpage.findOneAndRemove(data, function(err, result) {
    if (err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

Webpage.findOneAndUpdateQ = function(condition, data) {
  var deferred = Q.defer();

  Webpage.findOneAndUpdate(condition, data, function(err, result) {
    if (err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

Webpage.prototype.insert = function(data) {
  var deferred = Q.defer();

  Webpage.create(data, function(err, result) {
    if (err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

module.exports = Webpage;
