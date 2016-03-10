// Include gulp
var gulp = require('gulp');

// Include Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

// Lint Task
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('./css/'));
});


// Clean
gulp.task('clean', function() {
    return del(['css', 'js']);
});

//Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

//Watch
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
});
