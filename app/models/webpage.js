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
