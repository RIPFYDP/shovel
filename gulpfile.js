var gulp = require('gulp');
var mocha = require('gulp-mocha');
var exit = require('gulp-exit');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var nodemon = require('gulp-nodemon');

var app = require('./app');

gulp.task('test-once', function() {
  process.env.NODE_ENV = 'test';

  return gulp.src('test/**/**/*.js', {read: false})
             .pipe(mocha({reporter: 'nyan'}))
             .pipe(exit());
});

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
