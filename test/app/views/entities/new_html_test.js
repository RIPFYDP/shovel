var Nightmare = require('nightmare');
var chai = require('chai');
var expect = chai.expect;
var app = require('../../../../app');

var Webpage = require('../../../../app/models/webpage');

describe('/entities/new', function() {
  this.timeout(20000);

  before(function(done) {
    app.main('test');
    server = app.express.listen(3001);
    done();
  });

  after(function(done) {
    server.close();
    done();
  });

  beforeEach(function() {
    nightmare = new Nightmare();
  });

  it('create a new entity', function(done) {
    nightmare.goto('http://localhost:3001/entities/new')
    .select('select[name="webpage_id"]', '1')
    .type('input[name="selector"]', 'h1')
    .click('button.btn.btn-default')
    .wait('.alert-message')
    .evaluate(function() {
      return document.querySelector('.alert-message').innerText.trim();
    }, function(text) {
      expect(text).to.equal('Saved the entity.');
    })
    .run(done);
  });
});
