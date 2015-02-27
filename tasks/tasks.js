var mongoose = require('mongoose-q')(require('mongoose'));
var Q = require('q');
var developmentEnv = require('../config/environments/development');
var testEnv = require('../config/environments/test');
var taskHelpers = require('./task_helpers');

var task = {
  seed: function(env) {
    Q.fcall(taskHelpers.mongooseConnect)
    .then(taskHelpers.insertWebpages, 10)
    .then(taskHelpers.insertEntities, 100)
    .then(taskHelpers.associateWepagesEntities)
    .fin(taskHelpers.mongooseClose);
  }
};

module.exports = task;
