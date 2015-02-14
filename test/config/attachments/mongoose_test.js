var assert = require('chai').assert;
var Q = require('q');

var Mongoose = require('../../../config/attachments/mongoose');

describe('config/attachments/mongoose', function() {
  it('makes mongoose connection available', function(done) {
    var mongoose = new Mongoose();

    mongoose.connect()
    .then(function(db) {
      assert.equal(db.connection.readyState, 1);
      return db.connection.close();
    }, function(err) {
      console.log('Check if mongoDB is running.');
      assert.equal(err, null);
      done();
    })
    .then(function(db) {
      assert.equal(db.connections, null);
      done();
    });
  });
});
