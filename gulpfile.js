var gulp       = require('gulp'),
    qunit      = require('gulp-qunit'),
    uglify     = require('gulp-uglify'),
    concat     = require('gulp-concat'),
    browserify = require('gulp-browserify');

gulp.task('test', function() {
  return gulp.src('./tests/runner.html')
    .pipe(qunit());
});

gulp.task('build', function() {
  return gulp.src('lib/index.js')
    .pipe(browserify())
    .pipe(concat('applejax.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('compress', function() {
  return gulp.src('lib/index.js')
    .pipe(browserify())
    .pipe(uglify())
    .pipe(concat('applejax.min.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['test', 'build', 'compress']);
