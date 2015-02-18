var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var cheerio = require('cheerio');
var Webpage = require('./webpage');

var entitySchema = new Schema({
  date: { type: Date, default: Date.now },
  selector: String,
  value: String,
  webpage_id: String
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
  console.log(data);
  Entity.findOne(data, function(err, result) {
    if (err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

Entity.insertOneAndGetValueQ = function(data) {
  var deferred = Q.defer();

  Webpage.findOneQ({ id: data.webpage_id })
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
