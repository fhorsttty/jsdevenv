var gulp = require('gulp');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.config.dev.js');

var paths = {
  'srcStyles': ['src/assets/styles/style.styl'],
  'destStyles': 'dist/assets/styles/',
  'srcJS': ['src/assets/js'],
  'destJS': 'dist/assets/js',
  'src': 'src',
  'dest': 'dist',
};
var errorMessage = 'Error: <%= error.message %>';

gulp.task('js', function() {
  return webpackStream(webpackConfig, webpack)
    .on('error', function(err) {
      this.emit('end');
    })
    .pipe(gulp.dest(paths.destJS));
});

gulp.task('styles', function() {
  var stylusOptions = {
    'include css': true,
    linenos: false,
  };
  var reloadOptions = {
    stream: true,
    once: true,
  };

  return gulp.src(paths.srcStyles)
    .pipe(plumber({
      errorHandler: notify.onError(errorMessage),
    }))
    .pipe(sourcemaps.init())
    .pipe(stylus(stylusOptions))
    .pipe(gulp.dest(paths.destStyles))          // 圧縮前のcss, dest => string
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(paths.destStyles));         // 圧縮後のcss, dest => string
});

gulp.task('copy-resource', function() {
  var srcGlob = [
    paths.src + '/**/*',
    '!' + paths.src + '/assets/styles/**/*',
    '!' + paths.src + '/assets/js/**/*',
  ];

  return gulp.src(srcGlob)              // cp -r gulp.src/* gulp.dest/
    .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function() {
  watch([paths.src],function() {
    gulp.start(['js', 'styles', 'copy-resource']);
  });
});

gulp.task('default', ['watch']);
