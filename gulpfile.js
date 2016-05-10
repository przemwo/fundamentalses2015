var gulp = require('gulp');
var livereload = require('gulp-livereload');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

var paths = {
  source: {
    js: ['src/*.js'],
    css: ['src/*.scss'],
    html: ['*.html']
  }
};


gulp.task('js', function () {
  return gulp.src(paths.source.js)
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('css', function () {
  return gulp.src(paths.source.css)
    .pipe(sass())
    .pipe(gulp.dest('dist'));
});


// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});


// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', function() {
  gulp.watch(paths.source.js, ['js', browserSync.reload]);
  gulp.watch(paths.source.css, ['css', browserSync.reload]);
  gulp.watch(paths.source.html, ['js', browserSync.reload]);
});


gulp.task('default', ['css', 'js', 'serve', 'watch']);
