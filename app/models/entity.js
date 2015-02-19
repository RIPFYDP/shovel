var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var cheerio = require('cheerio');
var Webpage = require('./webpage');

var entitySchema = new Schema({
  date: { type: Date, default: Date.now },
  selector: String,
  value: String,
  _webpage: { type: String, ref: 'Webpage' }
});

var Entity = mongoose.model('Entity', entitySchema);

Entity.findAllQ = function() {
  var deferred = Q.defer();

  Entity.find({}, function(err, result) {
    if(err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

Entity.findAllPopulateQ = function() {
  var deferred = Q.defer();

  Entity.find({})
  .populate('_webpage')
  .exec(function(err, result) {
    if (err) {
      return deferred.reject(err);
    }
    console.log(result);
    deferred.resolve(result);
  });

  return deferred.promise;
}

Entity.insertOneQ = function(data) {
  var deferred = Q.defer();

  Entity.create(data, function(err, result) {
    if (err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

Entity.findOneQ = function(data) {
  var deferred = Q.defer();

  Entity.findOne(data, function(err, result) {
    if (err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

Entity.findOnePopulateQ = function(data) {
  var deferred = Q.defer();

  Entity.findOne(data)
  .populate('_webpage')
  .exec(function(err, result) {
    if (err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
}

Entity.insertOneAndGetValueQ = function(data) {
  var deferred = Q.defer();

  Webpage.findOneQ({ _id: data._webpage })
  .then(function(webpage) {
    var $ = cheerio.load(webpage.body);
    data.value = $(data.selector).text();
    return Entity.insertOneQ(data);
  }, function(err) {
    deferred.reject(err);
  })
  .then(function(entity) {
    deferred.resolve(entity);
  }, function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
};

module.exports = Entity;
