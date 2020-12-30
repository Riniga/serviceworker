var gulp = require('gulp');

var clean = require('gulp-clean');
gulp.task('clean', function () {
    return gulp.src('./public', { read: false, allowEmpty: true })
        .pipe(clean());
});

var pug = require('gulp-pug');
gulp.task('pug', function () {
    return gulp.src('./source/pug/pages/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('./public'));
});

var sass = require('gulp-sass');
sass.compiler = require('node-sass');
gulp.task('sass', function () {
    return gulp.src('./source/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('javascript', function() {
  return gulp.src('./source/javascript/**/*.js')
    .pipe(gulp.dest('./public/scripts'))
  ;
});

gulp.task('favicon', function() {
    return gulp.src('./source/favicon.ico')
      .pipe(gulp.dest('./public'));
  });

gulp.task('serviceworker', function() {
    return gulp.src('./public/scripts/serviceWorker.js')
      .pipe(gulp.dest('./public'));
});



gulp.task('watch', function () {
    gulp.watch('source/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('source/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('source/javascript/**/*.js', gulp.series('javascript', 'serviceworker'));
});

gulp.task('default', gulp.series('clean','pug','sass','javascript','favicon', 'serviceworker', function (done) {
    done();
}));
