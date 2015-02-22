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

  it('.countQ', function(done) {
    Webpage.countQ()
    .then(function(count) {
      expect(count).to.not.equal(0);
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('.findAllQ', function(done) {
    Webpage.findAllQ()
    .then(function(webpages) {
      expect(webpages.length).to.not.equal(0);
      expect(webpages).to.be.a('array');
      expect(webpages[0]).to.be.a('object');
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('.pickOneQ', function(done) {
    Webpage.pickOneQ()
    .then(function(webpage) {
      expect(webpage).to.be.a('object');
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('.findOneQ', function(done) {
    var wp;

    Webpage.pickOneQ()
    .then(function(webpage) {
      wp = webpage;
      return Webpage.findOneQ({_id: wp._id.toString()});
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(webpage) {
      expect(webpage._id.toString()).to.equal(wp._id.toString());
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('.findOneAndRemoveQ', function(done) {
    var wp = { url: 'https://www.reddit.com/r/leagueoflegends/' };

    Webpage.insertOneQ(wp)
    .then(function(webpage) {
      return Webpage.findOneAndRemoveQ({ _id: webpage._id.toString() });
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(webpage) {
      expect(webpage.url).to.equal(wp.url);
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('.findOneAndUpdateQ', function(done) {
    var wp = { url: 'https://www.reddit.com/r/leagueoflegends/' };
    var newUrl = 'http://chaijs.com/api/bdd/';

    Webpage.insertOneQ(wp)
    .then(function(webpage) {
      return Webpage.findOneAndUpdateQ({ _id: webpage._id.toString() },
                                       { url: newUrl });
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(webpage) {
      expect(webpage.url).to.equal(newUrl);
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('.insertOneQ', function(done) {
    var wp = { url: 'https://www.reddit.com/r/leagueoflegends/' };

    Webpage.insertOneQ(wp)
    .then(function(webpage) {
      expect(webpage.url).to.equal(wp.url);
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });
});
