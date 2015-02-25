var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var cheerio = require('cheerio');
var _ = require('lodash');
var Request = require('./request');

var entitySchema = new Schema({
  date: { type: Date, default: Date.now },
  selector: String,
  value: String,
  _webpage: { type: Schema.Types.ObjectId, ref: 'Webpage' }
});

var Entity = mongoose.model('Entity', entitySchema);
module.exports = Entity;

var Webpage = require('./webpage');

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

  Entity.findOne(data, function(err, result) {
    if (err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

Entity.findOnePopulateQ = function(condition) {
  var deferred = Q.defer();

  Entity.findOne(condition)
  .populate('_webpage')
  .exec(function(err, result) {
    if (err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

// Insert an entity and get the value for a selector.
// Populate entities atttribute of the webpage.
Entity.insertOneAndGetValueQ = function(data) {
  var deferred = Q.defer();
  var wp;
  var en;

  Webpage.findOneQ({ _id: data._webpage })
  .then(function(webpage) {
    wp = webpage;
    var $ = cheerio.load(webpage.body);
    data.value = $(data.selector).text();
    return Entity.insertOneQ(data);
  }, function(err) {
    deferred.reject(err);
  })
  .then(function(entity) {
    en = entity;
    wp.entities.push(entity);
    return wp.saveQ();
  }, function(err) {
    deferred.reject(err);
  })
  .then(function(webpage) {
    deferred.resolve(en);
  }, function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
};

Entity.findOneAndRemoveQ = function(data) {
  var deferred = Q.defer();

  Entity.findOneAndRemove(data, function(err, result) {
    if (err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

Entity.findOneAndUpdateQ = function(condition, data) {
  var deferred = Q.defer();

  Entity.findOneAndUpdate(condition, data, function(err, result) {
    if (err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

Entity.findOneAndUpdateWithValueQ = function(condition, data) {
  var deferred = Q.defer();
  var request = new Request();

  Webpage.findOneQ({ _id: data.webpage_id })
  .then(function(webpage) {
    if (_.isEmpty(webpage.body)) {
      data.value = '';
    } else {
      var $ = cheerio.load(webpage.body);
      data.value = $(data.selector).text();
    }

    return Entity.findOneAndUpdateQ(condition, data);
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
