var mongoose = require('mongoose-q')(require('mongoose'));
var Q = require('q');
var developmentEnv = require('../config/environments/development');
var testEnv = require('../config/environments/test');
var taskHelpers = require('./task_helpers');

var tasks = {
  seed: function(env) {
    Q.fcall(taskHelpers.mongooseConnect, env)
    .then(taskHelpers.insertWebpages)
    .then(taskHelpers.insertEntities)
    .then(taskHelpers.associateWepagesEntities)
    .fin(taskHelpers.mongooseClose);
  }
};

module.exports = tasks;
