var Q = require('q');
var _ = require('lodash');
var faker = require('faker');
var mongoose = require('mongoose');
var devEnv = require('../config/environments/development');
var testEnv = require('../config/environments/test');

var Webpage = require('../app/models/webpage');
var Entity = require('../app/models/entity');

var taskHelpers = {
  connection: {},

  mongooseConnect: function(env) {
    var deferred = Q.defer();

    if (env === 'test') {
      mongoose.connect(testEnv.database.fullUrl);
      setTimeout(function() {
        deferred.resolve(mongoose);
      }, 2000);
    } else if (env === 'development') {
      mongoose.connect(devEnv.database.fullUrl);
      setTimeout(function() {
        deferred.resolve(mongoose);
      }, 2000);
    }

    return deferred.promise;
  },

  insertWebpages: function() {
    var count = 3;
    var webpages = [];

    _.times(count, function(num) {
      webpages.push({
        url: 'http://reddit' + num + '.com',
        body: 'body',
        entities: []
      });
    });

    var operations = _.map(webpages, Webpage.insertOneQ);

    return Q.all(operations);
  },

  insertEntities: function(webpages) {
    var count = 5;
    var entities = [];

    _.times(count, function(num) {
      var randomNumber = _.random(0, webpages.length - 1);
      var webpage_id = webpages[randomNumber]._id.toString();

      var entity = {
        _webpage: webpage_id,
        selector: '#main'
      };

      entities.push(entity);
    });

    var operations = _.map(entities, Entity.insertOneAndGetValueQ);

    return Q.all(operations);
  },

  mongooseClose: function() {
    return taskHelpers.connection.close();
  }
};

module.exports = taskHelpers;
