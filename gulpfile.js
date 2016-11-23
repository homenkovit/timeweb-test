'use strict';

/* --------- components --------- */
var gulp         = require('gulp'),
    browserSync  = require('browser-sync').create(),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber      = require('gulp-plumber'),
    notify       = require('gulp-notify');

/* --------- paths --------- */
var paths = {
  sass: {
    src: './sass/**/*.scss',
    location: './sass/styles.scss',
    destination: './css'
  }
};

/* -------- gulp server  -------- */
gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    notify: false
  });
});

/* ------ sass ------ */
gulp.task('sass-compile', function () {
  gulp.src(paths.sass.location)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.sass.destination))
    .pipe(browserSync.stream());
});

/* -------- gulp watching  -------- */
gulp.task('watch', function () {
  gulp.watch(paths.sass.src, ['sass-compile']);
  gulp.watch([
    '*.html',
    './css/*.css',
    './js/*.js'
  ]).on('change', browserSync.reload);
});

gulp.task('default', [
  'sass-compile',
  'server',
  'watch'
]);

// ===================== Functions ======================

// Working with the errors
var log = function (error) {
  console.log([
    '',
    "----------ERROR MESSAGE START----------",
    ("[" + error.name + " in " + error.plugin + "]"),
    error.message,
    "----------ERROR MESSAGE END----------",
    ''
  ].join('\n'));
  this.end();
}
