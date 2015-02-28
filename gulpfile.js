var gulp = require('gulp');
var mocha = require('gulp-mocha');
var exit = require('gulp-exit');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var nodemon = require('gulp-nodemon');
var _ = require('lodash');
var faker = require('faker');
var Mongo = require('mongodb').MongoClient;
var development = require('./config/environments/development');
var test = require('./config/environments/test');
var assert = require('assert');
var Q = require('q');
var Random = require('random-js');
var rEngine = Random.engines.nativeMath;
var tasks = require('./tasks/tasks');

var app = require('./app');

gulp.task('lint', function() {
  var source = ['./app.js', './config/**/*.js', './test/**/*', 'app/**/*.js'];

  return gulp.src(source)
             .pipe(jshint())
             .pipe(jshint.reporter(stylish));
});

gulp.task('server', ['nodemon']);

gulp.task('nodemon', function() {
  process.env.NODE_ENV = 'development';

  nodemon({
    script: 'bin/www',
  }).on('restart');
});

gulp.task('db:drop', function() {
  Mongo.connect(development.database.fullUrl, function(err, db) {
    assert.equal(null, err);

    db.dropDatabase(function(err, result) {
      assert.equal(null, err);

      // Wait to seconds to let it replicate across
      setTimeout(function() {

        db.close();
      }, 2000);
    });
  });
});

gulp.task('db:seed', function() {
  var webpages = [];

  _.times(100, function() {
    webpages.push({
      body: faker.lorem.paragraph(),
      url: faker.internet.ip(),
      date: faker.date.recent()
    });
  });

  Mongo.connect(development.database.fullUrl, function(err, db) {
    assert.equal(null, err);

    db.createCollection('webpages', {}, function(err, collection) {
      assert.equal(null, err);

      collection.insert(webpages, function(err, result) {
        assert.equal(null, err);

        db.close();
      })
    });
  });
});

gulp.task('db:test:drop', function() {
  var deferred = Q.defer();

  Mongo.connect(test.database.fullUrl, function(err, db) {
    assert.equal(null, err);

    db.dropDatabase(function(err, result) {
      assert.equal(null, err);

      // Wait to seconds to let it replicate across
      setTimeout(function() {

        db.close();
        deferred.resolve(result);
      }, 2000);
    });
  });

  return deferred.promise;
});

gulp.task('db:test:seed', ['db:test:drop'], function() {
  var deferred = Q.defer();

  tasks.seed('test')
  .then(function(result) {
    return deferred.resolve(result);
  })

  return deferred.promise;
});


gulp.task('test-once', ['db:test:seed'], function() {
  process.env.NODE_ENV = 'test';

  return gulp.src('test/**/**/*.js', {read: false})
             .pipe(mocha({reporter: 'nyan'}))
             .pipe(exit());
});

gulp.task('db:development:seed', function() {
  var deferred = Q.defer();

  tasks.seed('development')
  .then(function(result) {
    return deferred.resolve(result);
  })

  return deferred.promise;
});


gulp.task('test-complete', ['db:test:drop', 'db:test:seed', 'test-once']);
