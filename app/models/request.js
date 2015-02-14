var Q = require('q');
var request = require('request');
var Request = function() {};

Request.prototype.get = function(url) {
  var deferred = Q.defer();

  request(url, function(err, response, body) {
    if (err) {
      deferred.reject(err);
    }

    if (!err && response.statusCode === 200) {
      deferred.resolve(body);
    }
  });

  return deferred.promise;
};

module.exports = Request;
