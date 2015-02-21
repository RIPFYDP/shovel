var Nightmare = require('nightmare');
var chai = require('chai');
var expect = chai.expect;
var app = require('../../../../app');

describe('/webpages/new', function() {
  this.timeout(50000);

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

  it('create a new webpage', function(done) {
    nightmare.goto('http://localhost:3001/webpages/new')
    .type('input[name="url"]', 'https://www.google.com/')
    .click('button.btn.btn-default')
    .wait('.alert-message')
    .evaluate(function() {
      return document.querySelector('.alert-message').innerText.trim();
    }, function(text) {
      expect(text).to.equal('Added a new webpage.');
    })
    .run(done);
  });
});
