'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
   gulp.src(['./styles/**/*.scss', '!./styles/common/fa430/scss/*.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./styles'));
});

gulp.task('sass:watch', function() {
   gulp.watch('./styles/**/*.scss', ['sass']);
});