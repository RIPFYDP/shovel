var chai = require('chai');
var expect = chai.expect;
var Q = require('q');
var _ = require('lodash');
var app = require('../../../app');

var Entity = require('../../../app/models/entity');
var Webpage = require('../../../app/models/webpage');

describe('entity model', function() {

  before(function(done) {
    app.main('test');
    server = app.express.listen(3001);
    done();
  });

  after(function(done) {
    server.close();
    done();
  });

  it('.findAllQ', function(done) {
    Entity.findAllQ()
    .then(function(entities) {
      expect(entities).to.be.a('array');
      expect(entities.length).to.not.equal(0);
      expect(entities[0]).to.be.a('object');
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('.findAllPopulateQ', function(done) {
    Entity.findAllPopulateQ()
    .then(function(entities) {
      expect(entities).to.be.a('array');
      expect(entities[0]._webpage).to.be.a('object');
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('.insertOneQ', function(done) {
    var en = { selector: '#main' };

    Webpage.pickOneQ()
    .then(function(webpage) {
      en._webpage = webpage._id.toString();
      return Entity.insertOneQ(en);
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(entity) {
      expect(entity).to.be.a('object');
      expect(entity.selector).to.equal(en.selector);
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('.findOneQ', function(done) {
    var en = { selector: '#main' };

    Webpage.pickOneQ()
    .then(function(webpage) {
      en._webpage = webpage._id.toString();
      return Entity.insertOneQ(en);
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(entity) {
      return Entity.findOneQ({ _id: entity._id.toString() });
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(entity) {
      expect(entity).to.be.a('object');
      expect(entity.selector).to.equal(en.selector);
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('.findOnePopulateQ', function(done) {
    var en = { selector: '#main' };

    Webpage.pickOneQ()
    .then(function(webpage) {
      en._webpage = webpage._id.toString();
      return Entity.insertOneQ(en);
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(entity) {
      return Entity.findOnePopulateQ({ _id: entity._id.toString() });
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(entity) {
      expect(entity).to.be.a('object');
      expect(entity.selector).to.equal(en.selector);
      expect(entity._webpage).to.be.a('object');
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  // Insert an entity and get the value for its selector.
  // Also populate entities attributes for the webpage.
  it('.insertOneAndGetValueQ', function(done) {
    var en = { selector: '#main' };
    var wp;
    var enCopy;

    Webpage.pickOneQ()
    .then(function(webpage) {
      wp = webpage;
      en._webpage = webpage._id.toString();
      return Entity.insertOneAndGetValueQ(en);
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(entity) {
      enCopy = entity;
      expect(entity).to.be.a('object');
      expect(entity.selector).to.equal(en.selector);
      return Webpage.findOneQ({ _id: wp._id.toString() });
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(webpage) {
      var entityIds = _.map(webpage.entities, function(entityId) {
        return entityId.toString();
      });

      expect(_.includes(entityIds, enCopy._id.toString())).to.equal(true);
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('.findOneAndRemoveQ', function(done) {
    var en = { selector: '#main' };

    Webpage.pickOneQ()
    .then(function(webpage) {
      en._webpage = webpage._id.toString();
      return Entity.insertOneAndGetValueQ(en);
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(entity) {
      return Entity.findOneAndRemoveQ({ _id: entity._id.toString() });
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(entity) {
      expect(entity).to.be.a('object');
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('.findOneAndUpdateQ', function(done) {
    var en = { selector: '#main' };
    var newSelector = '#top';

    Webpage.pickOneQ()
    .then(function(webpage) {
      en._webpage = webpage._id.toString();
      return Entity.insertOneAndGetValueQ(en);
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(entity) {
      return Entity.findOneAndUpdateQ({ _id: entity._id.toString() },
                                      { selector: newSelector });
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(entity) {
      expect(entity).to.be.a('object');
      expect(entity.selector).to.equal(newSelector);
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

  it('.findOneAndUpdateWithValueQ', function(done) {
    var en = { selector: '#main' };
    var newSelector = '#top';

    Webpage.pickOneQ()
    .then(function(webpage) {
      en._webpage = webpage._id.toString();
      return Entity.insertOneAndGetValueQ(en);
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(entity) {
      var data = { selector: newSelector, webpage_id: entity._webpage};

      return Entity.findOneAndUpdateWithValueQ({ _id: entity._id.toString() },
                                               data);
    }, function(err) {
      expect(err).to.equal(null);
      done();
    })
    .then(function(entity) {
      expect(entity).to.be.a('object');
      expect(entity.selector).to.equal(newSelector);
      done();
    }, function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

});
