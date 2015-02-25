var chai = require('chai');
var expect = chai.expect;
var Q = require('q');
var _ = require('lodash');
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
    var wp = { url: 'https://www.reddit.com/r/leagueoflegends/', body: 'yes' };

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
    var wp = { url: 'https://www.reddit.com/r/leagueoflegends/', body: 'yes' };
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
    var wp = { url: 'https://www.reddit.com/r/leagueoflegends/', body: 'yes' };

    Webpage.insertOneQ(wp)
    .then(function(webpage) {
      expect(webpage.url).to.equal(wp.url);
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('.reget', function(done) {
    var wp = {
      url: 'https://plus.google.com/+AddyOsmani',
      body: 'yes'
    };

    Webpage.insertOneQ(wp)
    .then(function(webpage) {
      expect(webpage).to.be.a('object');
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('.findAllPopulateQ', function(done) {
    Webpage.findAllPopulateQ()
    .then(function(webpages) {
      expect(webpages.length).to.not.equal(0);
      expect(webpages).to.be.a('array');
      expect(webpages[0]).to.be.a('object');

      // Find a webpage that has some entities
      var webpageWEntities = _.find(webpages, function(webpage) {
        return webpage.entities.length > 0;
      });

      var entities = webpageWEntities.entities;
      expect(entities).to.be.a('array');
      expect(entities[0]).to.be.a('object');
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('#saveQ', function(done) {
    var wp = { url: 'http://app.rhapsody.com/', body: 'yes' };
    var newUrl = 'http://app.rhapsody.com/members/jkim';

    Webpage.insertOneQ(wp)
    .then(function(webpage) {
      webpage.url = newUrl;
      return webpage.saveQ();
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
});
