//  ========================================================================  //
//  Variables
//  ========================================================================  //

// Browser definitions for autoprefixer
var browsers = [
  'last 5 versions'
];

//  ========================================================================  //
//  Processes
//  ========================================================================  //

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    del = require('del'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber');
    sourcemaps = require('gulp-sourcemaps');

var bounce = function () {
  gutil.beep();
  this.emit('end');
};

// Styles
gulp.task('styles', function() {
  return gulp.src('src/scss/main.scss')
    .pipe(plumber({ errorHandler: bounce }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer({
      cascade: false,
      browsers: browsers,
      flexbox: 'no-2009'
    }) ]))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Default task
gulp.task('build', ['clean'], function() {
  gulp.start('styles');
});

// Watch
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('src/scss/**/*.scss', ['styles']);
});

// Empty 'dist' directory
gulp.task('clean', function() {
  return del(['dist/css']);
});

gulp.task('default', ['build', 'watch']);
