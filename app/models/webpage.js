var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var Random = require('random-js');

var webpageSchema = new Schema({
  date: { type: Date, default: Date.now },
  url: String,
  body: String,
  entities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Entity' }]
});

var Webpage = mongoose.model('Webpage', webpageSchema);

Webpage.findAllQ = function() {
  var deferred = Q.defer();

  Webpage.find({}, function(err, result) {
    if(err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

Webpage.countQ = function() {
  deferred = Q.defer();

  Webpage.count(function(err, count) {
    if (err) {
      return deferred.reject(err);
    }

    return deferred.resolve(count);
  });

  return deferred.promise;
};

Webpage.pickOneQ = function() {
  var deferred = Q.defer();
  var webpagesCount;

  Webpage.countQ()
  .then(function(count) {
    webpagesCount = count;
    return Webpage.findAllQ();
  }, function(err) {
    deferred.reject(err);
  })
  .then(function(webpages) {
    var randomInt = Random.integer(0, webpagesCount - 1);
    deferred.resolve(webpages[randomInt]);
  }, function(err) {
    deferred.reject(err);
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

Webpage.insertOneQ = function(data) {
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
