var Q = require('q');
var request = require('request');
var _ = require('lodash');
var Request = function() {};

Request.prototype.get = function(url) {
  var deferred = Q.defer();

  request(url, function(err, response, body) {
    if (err) {
      return deferred.reject(new Error('Sorry, URL is invalid'));
    }

    if (!err && response.statusCode === 200) {
      deferred.resolve(body);
    }
  });

  return deferred.promise;
};

module.exports = Request;
