'use strict';

var del = require('del'),
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    path = require('path'),
    rename = require('gulp-rename'),
    strip = require('gulp-strip-comments'),
    uglify = require('gulp-uglify'),
    CONFIG = {
      paths: {
        src: './src/**/*.js',
        dist: './dist/'
      },
      tasks: {
        jslint: {
          reporter: {
            console: 'jshint-stylish',
            error: 'fail',
            output: {
              name: 'gulp-jshint-html-reporter',
              settings: {
                filename: './tests/jshint-output.html',
                createMissingFolders: true
              }
            }
          }
        },
        uglify: {
          mangle: false,
          compress: false,
          preserveComments: 'some'
        }
      }
    };

gulp
  .task('clean', ['clean:dist', 'clean:reports'])
  .task('clean:dist', function (callback) {
    del(CONFIG.paths.dist, callback);
  })
  .task('clean:reports', function (callback) {
    del(CONFIG.tasks.jslint.reporter.output.settings.filename, callback);
  })
  .task('lint', function () {
    return gulp
      .src([
        CONFIG.paths.src,
        path.join(CONFIG.paths.dist, '**/*.js')
      ])
      .pipe(jshint())
      .pipe(jshint.reporter(CONFIG.tasks.jslint.reporter.console))
      .pipe(jshint.reporter(CONFIG.tasks.jslint.reporter.output.name, CONFIG.tasks.jslint.reporter.output.settings))
      .pipe(jshint.reporter(CONFIG.tasks.jslint.reporter.error));
  })
  .task('build:unminified', function () {
    return gulp
      .src(CONFIG.paths.src)
      .pipe(strip())
      .pipe(gulp.dest(CONFIG.paths.dist));
  })
  .task('build:minified', function () {
    return gulp
      .src(CONFIG.paths.src)
      .pipe(uglify(CONFIG.tasks.uglify))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(CONFIG.paths.dist));
  })
  .task('build', ['build:unminified', 'build:minified'])
  .task('default', ['clean', 'build', 'lint']);