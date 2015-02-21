var chai = require('chai');
var expect = chai.expect;
var Q = require('q');
var app = require('../../../app');

var Webpage = require('../../../app/models/webpage');

describe('webpage model', function() {

  before(function(done) {
    app.main('test');
    server = app.express.listen(3001);
    done();
  });

  after(function(done) {
    server.close();
    done();
  });

  it('count', function(done) {
    Webpage.countQ()
    .then(function(count) {
      expect(count).to.not.equal(0);
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });
});
