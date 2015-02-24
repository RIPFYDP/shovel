var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var validator = require('validator');
var Random = require('random-js');
var rEngine = Random.engines.nativeMath;

var validators = {
  isURL: function(val) {
    return validator.isURL(val);
  }
};

var toValidate = {
  url: [validators.isURL, 'Please use a valid URL.']
};

var webpageSchema = new Schema({
  date: { type: Date, default: Date.now },
  url: { type: String, required: true, validate: toValidate.url },
  body: { type: String, required: true },
  entities: [{ type: Schema.Types.ObjectId, ref: 'Entity' }]
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
    var randomInt = Random.integer(0, webpagesCount - 1)(rEngine);

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

Webpage.reget = function(condition) {
  var deferred = Q.defer();

  Webpage.findOneAndUpdateQ(condition, {})
  .then(function(webpage) {
    deferred.resolve(webpage);
  }, function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
};

Webpage.findAllPopulateQ = function() {
  var deferred = Q.defer();

  Webpage.find({})
  .populate('entities')
  .exec(function(err, result){
    if(err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

module.exports = Webpage;
